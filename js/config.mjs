import { loadRespecWithConfiguration } from "https://logius-standaarden.github.io/publicatie/respec/organisation-config.mjs";

loadRespecWithConfiguration({
  specStatus: "WV",
  specType: "ST",
  pubDomain: "api",
  shortName: "authzen",
  publishDate: "2025-07-01",
  publishVersion: "0.0.1",
  //previousPublishVersion: [],
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
        "XACML": {
            href: "https://www.oasis-open.org/committees/xacml/repository/cs-xacml-specification-1.1.pdf",
            title: "eXtensible Access Control Markup Language (XACML) Version 1.1",
            authors: ["Simon Godik", "Tim Moses (Ed.)"],
            date: "2006"
        },
        "IANA.well-known-uris": {
            href: "https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml",
            title: "Well-Known URIs",
            date: "2010-01-20"
        },
        "MIM": {
            href: "https://docs.geostandaarden.nl/mim/mim/",
            title: "Metamodel Informatie Modellering",
            date: "13 juni 2024"
        },
        "REST API Design Rules": {
            href: "https://gitdocumentatie.logius.nl/publicatie/api/adr/",
            title: "NLGov REST API Design Rules 2.0.0",
            authors: ["Jasper Roes", "Joost Farla"],
            date: "Maart 2024"
        },
        "Logboek dataverwerkingen": {
            href: "https://logius-standaarden.github.io/logboek-dataverwerkingen/",
            title: "Logboek dataverwerkingen",
            authors: ["Eelco Hotting", "Vedran Bilanovic"],
            date: "n.t.b."
        },
        "W3C Verifiable Credentials": {
            href: "https://www.w3.org/TR/vc-data-model/",
            title: "Verifiable Credentials Data Model v1.1",
            authors: ["Manu Sporny", "Dave Longley", "David Chadwick"],
            date: "3 maart 2022"
        },
        "NL GOV Assurance profile for OAuth": {
            href: "https://gitdocumentatie.logius.nl/publicatie/api/oauth/",
            title: "NL GOV Assurance profile for OAuth 2.0",
            authors: ["Frank Terpstra", "Jan van Gelder"],
            date: "9 juli 2020"
        },
        "FSC - Core": {
            href: "https://commonground.gitlab.io/standards/fsc/core/draft-fsc-core-00.html",
            title: "FSC - Core",
            authors: ["Eelco Hotting", "Ronald Koster", "Henk van Maanen", "Niels Dequeker", "Edward van Gelderen", "Pim Gaemers"],
            date: "8 december 2023"
        },
        "OpenID NLGov": {
            href: "https://gitdocumentatie.logius.nl/publicatie/api/oidc/",
            title: "OpenID NLGov 1.0.1",
            authors: ["Remco Schaar", "Frank van Es", "Joris Joosten", "Jan Geert Koops"],
            date: "18 september 2023"
        },
        "SAML": {
            href: "https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf",
            title: "Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0",
            authors: ["Scott Cantor", "John Kemp", "Rob Philpott", "Eve Maler"],
            date: "15 maart 2005"
        }
    },
});
