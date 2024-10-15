sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "jquery.sap.global",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/TextArea"
], function (MessageToast, JSONModel, jQuery, Dialog, Text, Button, TextArea) {
    'use strict';

    return {
        fetch: function (oBindingContext, aSelectedContexts) {
            // Create a status text element
            var oStatusText = new Text({ text: "Starting to Fetch XML Data" });

            // Create a TextArea for displaying the XML data
            var oXMLDataTextArea = new TextArea({
                width: "100%",
                rows: 10,
                editable: false, 
                value: "" 
            });

            var oDialog = new Dialog({
                title: "Fetching Details",
                content: [oStatusText, oXMLDataTextArea],
                beginButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
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

            jQuery.ajax({
                url: "/odata/v4/nnrg/productData",
                method: "POST",
                contentType: "application/json",

                success: function (oData) {
                    console.log("XML DATA: ", oData);

                    oStatusText.setText("XML fetched successfully!");

                    oXMLDataTextArea.setValue(JSON.stringify(oData, null, 2)); // Convert JSON to string
                },

                error: function (oError) {
                    console.error("ERROR: ", oError);
                    oStatusText.setText("Error fetching billing docs!");
                },
            });
        }
    };
});
