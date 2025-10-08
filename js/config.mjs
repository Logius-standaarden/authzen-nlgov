import { loadRespecWithConfiguration } from "https://logius-standaarden.github.io/publicatie/respec/organisation-config.mjs";

loadRespecWithConfiguration({
  specStatus: "WV",
  specType: "ST",
  pubDomain: "api",
  shortName: "authzen",
  publishDate: "2025-07-01",
  publishVersion: "1.0.0",
  // TODO: verwijder voor publicatie
  latestVersion: "https://logius-standaarden.github.io/logboek-dataverwerkingen/",
  prevVersion: [],
  editors:
    [
      {
        name: "Project Federatieve Toegangsverlening",
        company: "MinBZK",
        companyURL: "https://vng-realisatie.github.io/ftv",
      }
    ],
  authors:
    [
      {
        name: "Project Federatieve Toegangsverlening",
        company: "MinBZK",
        companyURL: "https://vng-realisatie.github.io/ftv",
      }
    ],
  github: "https://github.com/Logius-standaarden/authzen-nlgov",
  localBiblio: {
        "IANA.well-known-uris": {
            href: "https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml",
            title: "IANA \"Well-Known URIs\" registry",
            date: "2010-01-20"
        },
        "MIM": {
            href: "https://docs.geostandaarden.nl/mim/mim/",
            title: "Metamodel Informatie Modellering",
            date: "13 juni 2024"
        },
    },
});
