sap.ui.define([
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button"
], function (MessageBox, Dialog, Text, Button) {
    "use strict";

    var MyModule = {
        fetch: function (oBindingContext, aSelectedContexts) {
            var messageTimeout;

            var oStatusText = new Text({ text: "Starting to Display the XML Data..." });

            var oDialog = new Dialog({
                title: "Fetching XML",
                content: [oStatusText],
                beginButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
                        clearTimeout(messageTimeout);
                    }
                }),
                endButton: new Button({
                    text: "OK",
                    press: function () {
                        oDialog.close();
                    }
                })
            });


            oDialog.open();
            messageTimeout = setTimeout(function () {
                var jsonData = [
                    { product_id: "1", product_name: "Product A", product_img: "img1.jpg", product_sell: "100", product_cost: "80" },
                    { product_id: "2", product_name: "Product B", product_img: "img2.jpg", product_sell: "150", product_cost: "120" }
                ];
                var xmlData = MyModule.jsonToXml(jsonData);

                oStatusText.setText(xmlData);

            }, 1000); 
        },

        jsonToXml: function (jsonData) {
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
    };

    return MyModule;
});