const cds = require("@sap/cds");
const { v4: uuidv4 } = require("uuid");

module.exports = cds.service.impl(async function () {


  // Status object to keep track of the process
  let fetchStatus = {
    messages: [" Initializing... "],  // Array to keep track of status messages
    completed: false
  };

  const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const { Product } = this.entities;

    this.on('productData', async (req) => {
        const jsonData = JSON.parse(req.data.jsonData); 

        const tx = cds.transaction(req);

        const insertPromises = jsonData.map((data) => {
            return tx.run(
                INSERT.into(Product).entries({
                    product_id: data.product_id || '',
                    product_name: data.product_name || '',
                    product_img: data.product_img || '',
                    product_sell: data.product_sell || '',
                    product_cost: data.product_cost || ''
                })
            );
        });

        await Promise.all(insertPromises);

        return { message: 'Data imported successfully!' };
    });

    
});
});
