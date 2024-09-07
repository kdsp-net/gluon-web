---
title: "Přidat se"
meta_title: "Přihláška pro angel investory"
description: "Přidejte se k Gluon Syndicate"
draft: false

step_1:
  title: "Možnosti členství"
  plans:
    - name: "Basic"
      id: "basic-membership"
      price: 1000
      multiple: false
      features:
        - title: "Deal flow"
        - title: "Kvartální pitch events"
        - title: "Online komunita"
          tooltip: "Získejte přístup k naší LinkedIn komunitě a WhatsApp skupine členů."
    - name: "Premium"
      id: "premium-membership"
      price: 3000
      multiple: false
      features:
        - title: "Všechny výhody Basic členství"
        - title: "Vstup na event pro doprovod"
          tooltip: "Získejte jednu neinvestorskou vstupenku na každý event a možnost přikoupit si až tři další za 200€/osoba."
        - title: "Nominační hlasování"
          tooltip: "Podívejte se jako první na shortlistované startupy a hlasujte pro ty, které chcete vidět na pitch eventu."
        - title: "Divoká karta"
          tooltip: "Vyberte si jeden startup ročně, který prostřednictvím divoké karty nominujete přimo na event."
    - name: "Corporate"
      id: "corporate-membership"
      price: 2000
      multiple: true
      features:
        - title: "Všechny výhody Basic členství"
        - title: "Vstup na event pro doprovod"
          tooltip: "Každý investor získává jednu neinvestorskou vstupenku na každý event a možnost přikoupit si až tři další za 200€/osoba."
        - title: "Nominační hlasování"
          tooltip: "Podívejte se jako první na shortlistované startupy a hlasujte pro ty, které chcete vidět na pitch eventu."
        - title: "Divoká karta"
          tooltip: "Vyberte si jeden startup ročně, který prostřednictvím divoké karty nominujete přimo na event."
        - title: "Partnerská visibilita"
          tooltip: "Odkomunikujte svůj brand v partnerské sekci na našem webu i na každém našem pitch eventu."

step_2:
  title: "Fakturační údaje"
  form:
  - id: name
    label: "Jméno a příjmení"
    placeholder: "John Appleseed"
    type: text
    required: true
  - id: email
    label: "Email"
    placeholder: "johnappleseed@email.com"
    type: email
    required: true
  - id: phone
    label: "Telefon"
    placeholder: "+1 234 567 890"
    type: tel
    required: true
  - id: company
    label: "Společnost"
    hint: "Optional"
    placeholder: "Gluon Syndicate, s. r. o."
    type: text
    required: false
  - id: address-1
    label: "Adresa (ulice a číslo domu)"
    placeholder: "Václavské náměstí 1"
    type: text
    required: true
  - id: address-2
    label: "Adresa (doplnění)"
    hint: "apt. or building"
    placeholder: ""
    type: text
    required: false
  - id: city
    label: "Město"
    placeholder: "Praha"
    type: text
    required: true
  - id: post-code
    label: "Post Code"
    placeholder: "110 00"
    type: text
    required: true
  - id: country
    label: "Country"
    placeholder: "Česko"
    type: text
    required: true
  - id: company_id
    label: "IČ"
    hint: "Optional"
    placeholder: ""
    type: text
    required: false
  - id: tax_id
    label: "DIČ"
    hint: "Optional"
    placeholder: ""
    type: text
    required: false

step_3:
  title: Souhrn
  consents:
    - id: tos
      label:
        text: "Souhlasím se"
        link: 
          text: "Všeobecnými obchodními podmínkami"
          url: "#"
      required: true
    - id: gdpr
      label:
        text: "Vyjadřuji"
        link:
          text: "Souhlas se spracováním osobních údajů"
          url: "#"
      required: true
    - id: nl
      label:
        text: "Chci se přihlásit k odběru newsletteru"

success_message: "Vaše objednávka byla úspěšně přijata"
error_message: "Omlouváme se, ale při zpracování objednávky se vyskytla chyba. Prosím zadejte ji znovu."

---
