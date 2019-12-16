const fs = require('fs')
const parse = require('csv-parse/lib/sync')
const stringify = require('csv-stringify/lib/sync')
const fetch = require('node-fetch');
const throttle = require('p-throttle');
const argv = require('yargs').argv

const oAuthToken = argv.token

if (!oAuthToken) {
    console.error('Please provide a Spotify API token: https://developer.spotify.com/console/get-search-item')
}

const fetchData = async (type, query) => {
    // Docs and oAuth token for Spotify API: https://developer.spotify.com/console/get-search-item
    const response = await fetch(`https://api.spotify.com/v1/search?type=${type}&q=${encodeURI(query)}`, { 
        headers: {'Authorization': `Bearer ${oAuthToken}`}
    })
    const json = await response.json()
    return json
}

const loadSpotifyMeta = throttle(async columns => { 
    const { artist, title } = columns
    const mainArtist = (artist.split(' ft. ')[0].split(' & ')[0])
    let result = await fetchData('track', `${mainArtist} ${title}`)
    let item = result.tracks && result.tracks.items[0]

    // If no album can be found, get meta data for artist 
    if (!item) {
        result = await fetchData('artist', mainArtist)
        item = result.artists && result.artists.items.length > 0 ? result.artists.items[0] : {}
    } 

    // Use album image if available, or artist image, or nothing
    const images = item.album ? item.album.images : item.images ? item.images : []

    console.log('Got meta data for:', item.name)

    return {
        ...columns,
        spotify_name: item.name || artist,
        spotify_id: item.id || 'n/a',
        spotify_type: item.type || 'n/a',
        spotify_thumb_md: images[1] ? images[1].url : '',
        spotify_thumb_sm: images[2] ? images[2].url : ''
    }
}, 2, 1000) // Throttle requests to 2 per second

const input = fs.readFileSync('./data/ranking.csv', 'utf8')
const songs = parse(input, { columns: true })
const metaData = songs.map(loadSpotifyMeta)

Promise.all(metaData).then(result => {
    const output = stringify(result, { header: true })
    fs.writeFileSync('./data/ranking+spotify.csv', output)

}).catch(error => console.error(`Error in promises! ${error}`))