---
title: "Pridať sa"
meta_title: "Prihláška pre angel investorov"
description: "Pridajte sa ku Gluon Syndicate"
draft: false

step_1:
  title: "Možnosti členstva"
  plans:
    - name: "Basic"
      id: "basic-membership"
      price: 1000
      multiple: false
      features:
        - title: "Deal flow"
        - title: "Kvartálne pitch events"
        - title: "Online komunita"
          tooltip: "Získajte prístup ku našej LinkedIn komunite a WhatsApp skupine členov."
    - name: "Premium"
      id: "premium-membership"
      price: 3000
      multiple: false
      features:
        - title: "Všetky výhody Basic členstva"
        - title: "Vstup na event pre sprievodnú osobu"
          tooltip: "Získajte jednu neinvestorskú vstupenku na každý event a možnosť prikúpiť si až tri ďalšie za 200€/osoba."
        - title: "Nominačné hlasovanie"
          tooltip: "Preskúmajte ako prví shortlistované startupy a hlasujte pre tie, ktoré chcete vidieť na pitch evente."
        - title: "Divoká karta"
          tooltip: "Vyberte si jeden startup ročne, ktorý prostredníctvom divokej karty nominujete priamo na event."
    - name: "Corporate"
      id: "corporate-membership"
      price: 2000
      multiple: true
      features:
        - title: "Všetky výhody Basic členstva"
        - title: "Vstup na event pre sprievodnú osobu"
          tooltip: "Získajte jednu neinvestorskú vstupenku na každý event a možnosť prikúpiť si až tri ďalšie za 200€/osoba."
        - title: "Nominačné hlasovanie"
          tooltip: "Preskúmajte ako prví shortlistované startupy a hlasujte pre tie, ktoré chcete vidieť na pitch evente."
        - title: "Divoká karta"
          tooltip: "Vyberte si jeden startup ročne, ktorý prostredníctvom divokej karty nominujete priamo na event."
        - title: "Partnerská vizibilita"
          tooltip: "Odkomunikujte svoj brand v partnerskej sekcii na našom webe aj na každom našom pitch evente."

step_2:
  title: "Fakturačné údaje"
  form:
  - id: name
    label: "Meno a priezvisko"
    placeholder: "John Appleseed"
    type: text
    required: true
  - id: email
    label: "Email"
    placeholder: "johnappleseed@email.com"
    type: email
    required: true
  - id: phone
    label: "Telefón"
    placeholder: "+1 234 567 890"
    type: tel
    required: true
  - id: company
    label: "Spoločnosť"
    hint: "Optional"
    placeholder: "Gluon Syndicate, s. r. o."
    type: text
    required: false
  - id: address-1
    label: "Adresa (ulica a číslo domu)"
    placeholder: "Pribinova 17954/10"
    type: text
    required: true
  - id: address-2
    label: "Adresa (doplnenie)"
    hint: "apt. or building"
    placeholder: ""
    type: text
    required: false
  - id: city
    label: "Mesto"
    placeholder: "Bratislava"
    type: text
    required: true
  - id: post-code
    label: "Post Code"
    placeholder: "811 09"
    type: text
    required: true
  - id: country
    label: "Country"
    placeholder: "Slovensko"
    type: text
    required: true
  - id: company_id
    label: "IČO"
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
  - id: vat_id
    label: "IČ DPH"
    hint: "Optional"
    placeholder: ""
    type: text
    required: false


step_3:
  title: Súhrn
  consents:
    - id: tos
      label:
        text: "Súhlasím so"
        link: 
          text: "Všeobecnými obchodnými podmienkami"
          url: "#"
      required: true
    - id: gdpr
      label:
        text: "Vyjadrujem"
        link:
          text: "Súhlas so spracovaním osobných údajov"
          url: "#"
      required: true
    - id: nl
      label:
        text: "Chcem sa prihlásiť ku odberu newslettera"

success_message: "Vaša objednávka bola úspešne prijatá."
error_message: "Ospravedlňujeme sa, ale pri spracovaní objednávky sa vyskytla chyba. Prosím, zadajte ju znova."

---
