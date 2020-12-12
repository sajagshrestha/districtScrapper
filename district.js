const puppeteer = require('puppeteer');

(async () =>{
    let url = "https://en.wikipedia.org/wiki/Category:Districts_of_Nepal";

    let browser=await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(url,{waitUntil:'networkidle2'});

    let data = await page.evaluate(()=>{
        let distData = Array.from(document.querySelectorAll('table[class="nowraplinks mw-collapsible autocollapse navbox-inner mw-made-collapsible"] tbody tr td div[style="padding:0em 0.25em"] ul li a'));
        return distData.map(a =>{
            districtObject = {
                'value' : a.innerText,
                'label' :a.innerText
            }
            return districtObject;
        });
    })

   
    console.log(data);

    await browser.close();
})();