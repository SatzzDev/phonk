const readline = require('readline')
const axios = require('axios')
const fs = require('fs')
const rl = readline.createInterface({input: process.stdin, output: process.stdout})

async function downloadTrack(url) {
try {
let ress = await axios.get('https://api.satzzdev.xyz/api/soundclouddl?url=' + url)
let buf = await axios.get(ress.data.url, {responseType: 'arraybuffer'}) 
let filename = url.split('/').pop() + '.mp3'
fs.mkdirSync('phonk', {recursive: true}) 
fs.writeFileSync(`phonk/${filename}`, Buffer.from(buf.data)) 
console.log(`✅ saved to: phonk/${filename}`)
} catch (err) {
console.error('❌ Error downloading track:', err.message)
}
}

function promptUser() {
rl.question('Enter SoundCloud track URL: ', async url => {
try {
await downloadTrack(url)
} catch (err) {
console.error('Error:', err.message)
}
promptUser()
})
}

promptUser()
