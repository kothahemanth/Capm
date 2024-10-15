const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const { Product } = this.entities;
    this.on('productData', async (req) => {
        try {
            const products = await SELECT.from(Product);
            const xmlData = jsonToXml(products);
            // console.log("Generated XML Data:\n", xmlData);
            return xmlData;
        } catch (error) {
            console.error("Error fetching products:", error);
            return "<error>Failed to fetch product data</error>";
        }
    });

    function jsonToXml(jsonData) {
        if (!Array.isArray(jsonData)) {
            return "<error>Invalid JSON data provided</error>";
        }

        let xml = '<?xml version="1.0" ?>\n<products>\n';
        jsonData.forEach(item => {
            xml += '    <product>\n';
            xml += `        <product_id>${item.product_id || 'N/A'}</product_id>\n`;
            xml += `        <product_name>${item.product_name || 'N/A'}</product_name>\n`;
            xml += `        <product_img>${item.product_img || 'N/A'}</product_img>\n`;
            xml += `        <product_sell>${item.product_sell || 'N/A'}</product_sell>\n`;
            xml += `        <product_cost>${item.product_cost || 'N/A'}</product_cost>\n`;
            xml += '    </product>\n';
        });

        xml += '</products>';
        return xml; 
    }
});
