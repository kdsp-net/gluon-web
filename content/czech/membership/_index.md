---
title: "Přidat se"
meta_title: "Přihláška pro angel investory"
description: "Přidejte se k Gluon Syndicate"
draft: false

step_1:
  title: "Členské plány"
  plans:
    - name: "Základní"
      id: "basic-membership"
      price: 1000
      multiple: false
      features:
        - title: "Přístup k dealflow a aplikaci"
          tooltip: "Přístup ke prověřenému dealflow, právnímu frameworku, investorské aplikaci a nástrojům pro správu portfolia."
        - title: "4× online vstupenka na Pitch Event"
          tooltip: "Pokrývá online účast na 4 Pitch Eventech ročně (živé vysílání hlavního programu)."
        - title: "1× in-person vstupenka na Pitch Event"
          tooltip: "Pokrývá osobní účast na 1 Pitch Eventu ročně."
        - title: "Přístup do komunity"
          tooltip: "Vstup do uzavřené WhatsApp skupiny pro investory."

    - name: "Premium"
      id: "premium-membership"
      price: 3000
      multiple: false
      features:
        - title: "Přístup k dealflow a aplikaci"
          tooltip: "Přístup k prověřenému dealflow, právnímu frameworku, investorské aplikaci a nástrojům pro správu portfolia."
        - title: "4× online vstupenka na Pitch Event"
          tooltip: "Pokrývá online účast na 4 Pitch Eventech ročně (živé vysílání hlavního programu)."
        - title: "8× in-person vstupenka na Pitch Event"
          tooltip: "Celkem 8 vstupů ročně na Pitch Eventy (formát investor +1)."
        - title: "Přístup do komunity"
          tooltip: "Vstup do uzavřené WhatsApp skupiny pro investory."
        - title: "50% sleva na poplatek za správu portfolia"
          tooltip: "50% sleva z ročního poplatku €200 za každé SPV, ve kterém investujete."
        - title: "Investorské vstupenky na startup akce"
          tooltip: "Investorské vstupenky na nejlepší evropské startupové konference (např. WebSummit, Reflect, Slush)."

    - name: "Partner"
      id: "partner-membership"
      price: 2000
      multiple: true
      features:
        - title: "Vše z Premium"
        - title: "Přístup pro tým"
          tooltip: "Každé členstvý zahrnuje plné výhody; ideální pro VC fondy a akcelerátory."
        - title: "Viditelnost partnera"
          tooltip: "Logo na webu a prezentace na Pitch Eventech."

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
    hint: "Nepovinné"
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
    hint: ""
    placeholder: ""
    type: text
    required: false
  - id: city
    label: "Město"
    placeholder: "Praha"
    type: text
    required: true
  - id: post-code
    label: "PSČ"
    placeholder: "110 00"
    type: text
    required: true
  - id: country
    label: "Stát"
    placeholder: "Vyberte stát…"
    required: true
    select:
      - value: 56
        label: "Česko"
      - value: 201
        label: "Slovensko"
      - value: 12
        label: "Rakousko"
      - value: 57
        label: "Německo"
      - value: 43
        label: "Švýcarsko"
      - value: 189
        label: "Srbsko"
  - id: company_id
    label: "IČ"
    hint: "Nepovinné"
    placeholder: ""
    type: text
    required: false
  - id: tax_id
    label: "DIČ"
    hint: "Nepovinné"
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

success_message: "Vaše objednávka byla úspěšně přijata"
error_message: "Omlouváme se, ale při zpracování objednávky se vyskytla chyba. Prosím zadejte ji znovu."

---
