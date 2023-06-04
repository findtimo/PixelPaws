const { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync } = require('fs');
const sharp = require('sharp');

const template = `
    <svg width="862" height="862" viewBox="0 0 862 862" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- bg -->
        <!-- misc -->
        <!-- horn -->
        <!-- body -->
        <!-- eye -->
        <!-- mouth -->
        <!-- hair -->
    </svg>
`

const takenNames = {};
const takenFaces = {};
let idx = 100;

function randInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

function randElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


function getRandomName() {
    const adjectives = 'glitch fired trashy tubular nasty jacked cosmic swol buff ferocious firey flamin agnostic artificial bloody crazy cringey crusty dirty eccentric glutinous harry juicy simple stylish awesome creepy corny freaky shady sketchy lame sloppy hot intrepid juxtaposed killer ludicrous mangy pastey ragin rusty rockin sinful shameful stupid sterile ugly vascular wild young old zealous flamboyant super sly shifty trippy fried injured depressed anxious clinical'.split(' ');
    const names = 'aaron bart chad dale earl fred grady harry ivan jeff joe kyle lester steve tanner lucifer todd mitch hunter mike arnold norbert olaf plop quinten randy saul balzac tevin jack ulysses vince will xavier yusuf zack roger raheem rex dustin seth bronson dennis whiskers tails cuddles paws wag nuzzle bob saint lick hugs'.split(' ');
    
    const randAdj = randElement(adjectives);
    const randName = randElement(names);
    const name =  `${randAdj}-${randName}`;


    if (takenNames[name] || !name) {
        return getRandomName();
    } else {
        takenNames[name] = name;
        return name;
    }
}

function getLayer(name, skip=0.0) {
    const svg = readFileSync(`./layers/${name}.svg`, 'utf-8');
    const re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g
    const layer = svg.match(re)[0];
    return Math.random() > skip ? layer : '';
}

async function svgToPng(name) {
    const src = `./out/${name}.svg`;
    const dest = `./out/${name}.png`;

    const img = await sharp(src);
    const resized = await img.resize(1024);
    await resized.toFile(dest);
}


function createImage(idx) {
    
    const bg = randInt(5);
    const misc = randInt(0);
    const horn = randInt(24);
    const body = randInt(15); 
    const eye = randInt(4);
    const mouth = randInt(4);
    const hair = randInt(5);

    const face = [misc, horn, body, eye, mouth, hair].join('');

    if (face[takenFaces]) {
        createImage();
    } else {
        const name = getRandomName()
        console.log(name)
        face[takenFaces] = face;

        const final = template
            .replace('<!-- bg -->', getLayer(`bg`))
            .replace('<!-- misc -->', getLayer(`misc${misc}`, 0.2))
            .replace('<!-- horn -->', getLayer(`horn${horn}`), 0.7)
            .replace('<!-- body -->', getLayer(`body${body}`))
            .replace('<!-- eye -->', getLayer(`eye${eye}`))
            .replace('<!-- mouth -->', getLayer(`mouth${mouth}`))
            .replace('<!-- hair -->', getLayer(`hair${hair}`))

        const meta = {
            name,
            description: `NeoPixels No: ${name.split('-').join(' ')}`,
            image: `${idx}.png`,
            // attributes: [
            //     { 
            //         misc: '',
            //         rarity: 0.2
            //     },
            //     { 
            //         horn: '',
            //         rarity: 0.7
            //     }
            // ]
            

        }
        writeFileSync(`./out/${idx}.json`, JSON.stringify(meta))
        writeFileSync(`./out/${idx}.svg`, final)
        svgToPng(idx)
    }


}


// Create dir if not exists
if (!existsSync('./out')){
    mkdirSync('./out');
}

// Cleanup dir before each run
readdirSync('./out').forEach(f => rmSync(`./out/${f}`));


do {
    createImage(idx);
    idx--;
  } while (idx >= 0);
