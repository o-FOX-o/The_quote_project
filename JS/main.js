
async function setQuotesData(){
    const quotesData = await require('./quotes');
    const tags = await quotesData.tags
    const quotesObj = await quotesData.quotesFile
    console.log(quotesObj)
}
 setQuotesData()
