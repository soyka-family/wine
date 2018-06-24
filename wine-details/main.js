function showBottleInfo(bottleLocation) {
    var wineId, fields, countryId;
    var getUrl = "https://api.airtable.com/v0/appusHM4BNwtCTF8G/Bottle%20Locations?filterByFormula=" + encodeURIComponent('{Location Code} = "' + bottleLocation + '"');
    axios({
        method: "get",
        url: getUrl,
        headers: {
            "Authorization": "Bearer keyAgG52BdBvlu1p6"
        }
    }).then(function(response) {
        wineId = response.data.records[0].fields.Bottle[0];
        var getUrl2 = "https://api.airtable.com/v0/appusHM4BNwtCTF8G/Wines/" + wineId;
        axios({
            method: "get",
            url: getUrl2,
            headers: {
                "Authorization": "Bearer keyAgG52BdBvlu1p6"
            }
        }).then(function(response2) {
            fields = response2.data.fields;
            console.log(fields);
            setHTML("alchoholPercentage", fields["Alcohol by Volume"] ? fields["Alcohol by Volume"] : "N/A")
            setHTML("barcode", fields["Barcode"] ? fields["Barcode"].text : "N/A");
            setHTML("bottleLocations", fields["Bottle Locations"] ? fields["Bottle Locations"].join(", ") : "N/A");
            setHTML("bottleSize", fields["Bottle Size in Oz."] ? fields["Bottle Size in Oz."] : "N/A");
            setHTML("countryOfOrigin", fields["Country of Origin"] ? fields["Country of Origin"][0] : "N/A");
            setHTML("name", fields["Name"] ? fields["Name"] : "N/A");
            setHTML("price", fields["Price"] ? "$" + fields["Price"] : "N/A");
            setHTML("producer", fields["Producer"] ? fields["Producer"][0] : "N/A");
            setHTML("purchaseYear", fields["Purchase Year"] ? fields["Purchase Year"] : "N/A");
            setHTML("purchasedFrom", fields["Purchased From"] ? fields["Purchased From"][0] : "N/A");
            setHTML("quantityAvailable", fields["Quantity Available"] ? fields["Quantity Available"] : "N/A");
            setHTML("typeOfWine", fields["Type of Wine"] ? fields["Type of Wine"] : "N/A");
            setHTML("year", fields["Year"] ? fields["Year"] : "N/A");
            var bottleLocationsString = document.getElementById("bottleLocations").innerHTML;
            if (bottleLocationsString != "N/A") {
                var bottleLocations = bottleLocationsString.split(", ");
                bottleLocations.forEach(function(currentValue, index) {
                    axios({
                        method: "get",
                        url: "https://api.airtable.com/v0/appusHM4BNwtCTF8G/Bottle%20Locations/" + currentValue,
                        headers: {
                            "Authorization": "Bearer keyAgG52BdBvlu1p6"
                        }
                    }).then(function(response3) {
                        bottleLocations[index] = response3.data.fields["Location Code"];
                        setHTML("bottleLocations", bottleLocations.join(", "));
                    });
                });
            }
            var countryOfOrigin = document.getElementById("countryOfOrigin").innerHTML;
            if (countryOfOrigin != "N/A") {
                axios({
                    method: "get",
                    url: "https://api.airtable.com/v0/appusHM4BNwtCTF8G/Wine-Making%20Countries/" + countryOfOrigin,
                    headers: {
                        "Authorization": "Bearer keyAgG52BdBvlu1p6"
                    }
                }).then(function(response4) {
                    setHTML("countryOfOrigin", response4.data.fields["Name"]);
                });
            }
            var producer = document.getElementById("producer").innerHTML;
            if (producer != "N/A") {
                axios({
                    method: "get",
                    url: "https://api.airtable.com/v0/appusHM4BNwtCTF8G/Producers/" + producer,
                    headers: {
                        "Authorization": "Bearer keyAgG52BdBvlu1p6"
                    }
                }).then(function(response5) {
                    setHTML("producer", response5.data.fields["Name"]);
                });
            }
            var purchasedFrom = document.getElementById("purchasedFrom").innerHTML;
            if (purchasedFrom != "N/A") {
                axios({
                    method: "get",
                    url: "https://api.airtable.com/v0/appusHM4BNwtCTF8G/Locations/" + purchasedFrom,
                    headers: {
                        "Authorization": "Bearer keyAgG52BdBvlu1p6"
                    }
                }).then(function(response6) {
                    setHTML("purchasedFrom", response6.data.fields["Name"]);
                });
            }
        });
    });
}

function setHTML(elementId, newContent) {
    document.getElementById(elementId).innerHTML = newContent;
}
