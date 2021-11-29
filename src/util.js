import React from "react";
import numeral from "numeral";
import { CircleMarker, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 0.007,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 0.006,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 0.05,
    },
};

export const sortData = (data) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortedData;
};

export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesTypes) =>
    data.map((country) => (
        <CircleMarker
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypes === 'cases' ? "#CC1034" : (casesTypes === "recovered" ? "#7dd71d" : "#fb4443")}
            fillColor={casesTypes === 'cases' ? "#CC1034" : (casesTypes === "recovered" ? "#7dd71d" : "#fb4443")}
            fillOpacity={0.4}
            radius={
                Math.sqrt(country[casesTypes]) * casesTypeColors[casesTypes].multiplier
            }>
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    ></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">
                        Cases: {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="info-recovered">
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="info-deaths">
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </CircleMarker>
    ));