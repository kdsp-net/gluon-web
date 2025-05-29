---
title: "Pridať sa"
meta_title: "Prihláška pre angel investorov"
description: "Pridajte sa ku Gluon Syndicate"
draft: false

step_1:
  title: "Členské plány"
  plans:
    - name: "Basic"
      id: "basic-membership"
      price: 1000
      multiple: false
      features:
        - title: "Prístup k preverenému dealflow a aplikácii"
          tooltip: "Prístup k preverenému dealflow, právnemu frameworku, investorskej aplikácii a nástrojom na správu portfólia."
        - title: "4× online vstupenka na Pitch Event"
          tooltip: "Zahŕňa online prístup na 4 Pitch Eventy ročne (streamovaný hlavný program)."
        - title: "1× in-person vstupenka na Pitch Event"
          tooltip: "Zahŕňa osobnú účasť na 1 Pitch Evente ročne."
        - title: "Prístup do komunity"
          tooltip: "Prístup do uzavretej WhatsApp skupiny pre investorov."

    - name: "Premium"
      id: "premium-membership"
      price: 3000
      multiple: false
      features:
        - title: "Prístup k dealflow a aplikácii"
          tooltip: "Prístup k preverenému dealflow, právnemu frameworku, investorskej aplikácii a nástrojom na správu portfólia."
        - title: "4× online vstupenka na Pitch Event"
          tooltip: "Zahŕňa online prístup na 4 Pitch Eventy ročne (streamovaný hlavný program)."
        - title: "8× in-person vstupenka na Pitch Event"
          tooltip: "Spolu 8 vstupov ročne na Pitch Eventy (formát investor +1)."
        - title: "Prístup do komunity"
          tooltip: "Prístup do uzavretej WhatsApp skupiny pre investorov."
        - title: "50% zľava na poplatok za SPV"
          tooltip: "50% zľava z ročného poplatku €200 za každé SPV, v ktorom investujete."
        - title: "Investorské vstupenky na startup podujatia"
          tooltip: "Investorské vstupenky na top európske startupové konferencie (napr. WebSummit, Reflect, Slush)."

    - name: "Partner"
      id: "partner-membership"
      price: 2000
      multiple: true
      features:
        - title: "Všetko z Premium"
        - title: "Tímový prístup"
          tooltip: "Každé členstvo obsahuje plné výhody; ideálne pre VC fondy a akcelerátory."
        - title: "Vizibilita partnera"
          tooltip: "Logo na webstránke a prezentácia počas Pitch Eventov."

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
    hint: "Nepovinné"
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
    hint: ""
    placeholder: ""
    type: text
    required: false
  - id: city
    label: "Mesto"
    placeholder: "Bratislava"
    type: text
    required: true
  - id: post-code
    label: "PSČ"
    placeholder: "811 09"
    type: text
    required: true
  - id: country
    label: "Štát"
    placeholder: "Vyberte štát…"
    required: true
    select:
      - value: 201
        label: "Slovensko"
      - value: 56
        label: "Česko"
      - value: 12
        label: "Rakúsko"
      - value: 57
        label: "Nemecko"
      - value: 43
        label: "Švajčiarsko"
      - value: 189
        label: "Srbsko"
  - id: company_id
    label: "IČO"
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
  - id: vat_id
    label: "IČ DPH"
    hint: "Nepovinné"
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

success_message: "Ďakujeme. Čoskoro obdržíte faktúru a pokyny na platbu do svojej e-mailovej schránky."
error_message: "Ospravedlňujeme sa, ale pri spracovaní objednávky sa vyskytla chyba. Prosím, zadajte ju znova."

---
