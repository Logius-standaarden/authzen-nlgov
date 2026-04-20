import { loadRespecWithConfiguration } from "https://logius-standaarden.github.io/publicatie/respec/organisation-config.mjs";

loadRespecWithConfiguration({
  specStatus: "WV",
  specType: "ST",
  pubDomain: "api",
  shortName: "authzen",
  publishDate: "2025-07-01",
  publishVersion: "1.0.0",
  // TODO: verwijder voor publicatie
  latestVersion: "https://logius-standaarden.github.io/authzen-nlgov/",
  prevVersion: [],
  editors:
    [
      {
        name: "Stas Mironov",
        company: "Logius",
        companyURL: "https://www.logius.nl"
      },
      {
        name: "Alexander Green",
        company: "Logius",
        companyURL: "https://www.logius.nl"
      }
    ],
  authors:
    [
      {
        name: "Michiel Trimpe",
        company: "VNG Realisatie",
        companyURL: "https://vng.nl/artikelen/vng-realisatie"
      }
    ],
  github: "https://github.com/Logius-standaarden/authzen-nlgov",
  localBiblio: {
        "NIST.SP.800-162": {
            href: " https://doi.org/10.6028/NIST.SP.800-162 ",
            title: " Guide to Attribute Based Access Control (ABAC) Definition and Considerations ",
            authors: ["Vincent C. Hu","David Ferraiolo","Rick Kuhn","Adam Schnitzer","Kenneth Sandlin","Robert Miller","Karen Scarfone"],
            date: " January 2014 "
        }, 
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
