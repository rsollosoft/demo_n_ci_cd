const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    doWebScrapping(affiliateLink) {
        console.log("called = " + affiliateLink)
        // const affiliateLink = req.body.link;
        get(affiliateLink)
    }
}

async function get(affiliateLink) {
    try {
        const response = await axios.get('https://www.amazon.com/s?k=mobiles&crid=KTL5FNCSDS9A&sprefix=mobiles%2Caps%2C447&ref=nb_sb_noss_1',
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                },
            });

        const html = response.data;
        const $ = cheerio.load(html);

        // Extract the product name
        // const name = $('h2.a-size-mini').text().trim();
        // const price = $('span.a-price span.a-offscreen').text();

        // const pricesArray = price.split('$').filter(price => price);
        // const formattedPrices = pricesArray.map(price => `$${parseFloat(price).toFixed(2)}`);

        // console.log(formattedPrices.join(', '));
        // console.log(name);

        const productData = [];

        // Iterate over each product entrys
        $('div.rush-component div.s-latency-cf-section').each((index, element) => {
            const name = $(element).find('h2.a-size-mini').text().trim();
            const link = 'https://www.amazon.com' + $('a.a-link-normal a.a-text-normal').attr('href');
            const price = $(element).find('span.a-price span.a-offscreen').text();
            const imageURL = $(element).find('img.s-image').attr('src');
            const product = {
                'name' : name,
                'link' : link,
                'price' : price,
                'imageURL' : imageURL,
            };
            productData.push(product);
        });

        console.log(productData.length);
        // console.log(productData);


    } catch (error) {
        console.log("errorr = " + error);
    }
}


const puppeteer = require("puppeteer");

const scrapeProducts = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.amazon.com/");
  await page.type("#twotabsearchtextbox", "JavaScript book");
  await page.click("#nav-search-submit-text");
  await page.waitForNavigation();
  const products = await page.evaluate(() => {
    let results = [];
    const items = document.querySelectorAll(".s-result-item .s-card-border");
    for (let i = items.length; i--; ) {
      const item = items[i];
      const title = item.querySelector("h2 > a > span");
      const price = item.querySelector(".a-price-whole");
      const cents = item.querySelector(".a-price-fraction");
      const image = item.querySelector("img");
      if (!title || !price || !image) continue;
      results = [...results, {
        title: title.innerText,
        price: parseFloat(`${parseInt(price.innerText)}.${parseInt(cents.innerText)}`),
        image: image.getAttribute("src")
      }]
    }
    return results;
  });
  console.log("products = " + products);
  await browser.close();
}

scrapeProducts();


