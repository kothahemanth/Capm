const cds = require('@sap/cds');
const json2xml = require('json2xml');
const axios = require('axios');
module.exports = cds.service.impl(async function () {
const {Product}=this.entities
    this.on('productData','Product', async (req) => {
        console.log(req.params);
        const { ID } = req.params[0];  
        const rowData = await SELECT.one.from(Product).where({ ID: ID });

        if (!rowData) {
            return req.error(404, `No data found for ID: ${ID}`);
        }

        console.log("Row data:", rowData);

        // const xmlData = create({ version: '1.0', encoding: 'UTF-8' })
        //     .ele('Product')  // Root element
        //         .ele('ID').txt(rowData.ID).up()
        //         .ele('product_id').txt(rowData.product_id || 'N/A').up() // Adjusted to match entity
        //         .ele('product_name').txt(rowData.product_name || 'N/A').up() // Adjusted to match entity
        //         .ele('product_img').txt(rowData.product_img || 'N/A').up() // Adjusted to match entity
        //         .ele('product_cost').txt(rowData.product_cost ? rowData.product_cost.toString() : 'N/A').up() // Adjusted to match entity
        //         .ele('product_sell').txt(rowData.product_sell ? rowData.product_sell.toString() : 'N/A').up() // Adjusted to match entity
        //     .end({ prettyPrint: true });
        
        const xmlfun = (rowData) => {

            const xmlData = json2xml({Product: rowData}, {header: true});
            return xmlData;
        }

        const callxml = xmlfun(rowData);


        console.log("Generated XML:", callxml);
        const base64EncodedXML = Buffer.from(callxml).toString('base64');

        console.log("Base64 Encoded XML:", base64EncodedXML);
        try {
          const authResponse = await axios.get('https://runsimple.authentication.us10.hana.ondemand.com/oauth/token', {
              params: {
                  grant_type: 'client_credentials'
              },
              auth: {
                  username: 'sb-0659fb15-d82d-43fc-9a1a-4ff294ffade6!b33406|ads-xsappname!b65488',
                  password: 'cad88edf-9d4c-4a29-8301-7d89403c35df$xJJn5FeYQgciuMINbDMk86-7AHxHgl2p6n6nijoaCqA='
              }
          });
          const accessToken = authResponse.data.access_token;
          console.log("Access Token:", accessToken);
          const pdfResponse = await axios.post('https://adsrestapi-formsprocessing.cfapps.us10.hana.ondemand.com/v1/adsRender/pdf?templateSource=storageName', {
              xdpTemplate: "hemanth/Default",
              xmlData: base64EncodedXML, 
              formType: "print",
              formLocale: "",
              taggedPdf: 1,
              embedFont: 0
          }, {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
              }
          });
          const fileContent = pdfResponse.data.fileContent;
          console.log("File Content:", fileContent);
          return fileContent;

      } catch (error) {
          console.error("Error occurred:", error);
          return req.error(500, "An error occurred while processing your request.");
      }
        

       
    });
});