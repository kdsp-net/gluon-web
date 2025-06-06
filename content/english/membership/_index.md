---
title: "Join"
meta_title: ""
description: "this is meta description"
draft: false

step_1:
  title: "Membership Plan"
  plans:
    - name: "Basic"
      id: "basic-membership"
      price: 1000
      multiple: false
      features:
        - title: "Dealflow & app access"
          tooltip: "Access curated startup dealflow, legal framework, investor app, and portfolio tools."
        - title: "4× online event vouchers"
          tooltip: "Covers online access to 4 Pitch Events per year (streamed stage program)."
        - title: "1× in-person event voucher"
          tooltip: "Covers in-person access to 1 Pitch Event per year."
        - title: "50% portfolio fee discount"
          tooltip: "50% off the €200/year fee per SPV you invest in."
        - title: "Community access"
          tooltip: "Join the invite-only WhatsApp investor group for discussions and updates."

    - name: "Premium"
      id: "premium-membership"
      price: 3000
      multiple: false
      features:
        - title: "Dealflow & app access"
          tooltip: "Access curated startup dealflow, legal framework, investor app, and portfolio tools."
        - title: "4× online event vouchers"
          tooltip: "Covers online access to 4 Pitch Events per year (streamed stage program)."
        - title: "8× in-person event vouchers"
          tooltip: "Total of 8 in-person Pitch Event entries per year (investor +1 per event)."
        - title: "100% portfolio fee discount"
          tooltip: "100% off the €200/year fee per SPV you invest in."
        - title: "Community access"
          tooltip: "Join the invite-only WhatsApp investor group for discussions and updates."
        - title: "Investor passes to startup events"
          tooltip: "1× investor pass for Europe’s top startup event, additional passes at discounted prices"

    - name: "Partner"
      id: "partner-membership"
      price: 2000
      multiple: true
      features:
        - title: "All Premium features"
        - title: "Team access"
          tooltip: "Each seat includes full benefits; ideal for VC firms and accelerators."
        - title: "Partner visibility"
          tooltip: "Logo displayed on our website and at Pitch Events."

step_2:
  title: "Billing Information"
  form:
  - id: name
    label: "Name"
    placeholder: "John Appleseed"
    type: text
    required: true
  - id: email
    label: "Email"
    placeholder: "johnappleseed@email.com"
    type: email
    required: true
  - id: phone
    label: "Telephone"
    placeholder: "+1 234 567 890"
    type: tel
    required: true
  - id: company
    label: "Company"
    hint: "Optional"
    placeholder: "Gluon Syndicate, s. r. o."
    type: text
    required: false
  - id: address-1
    label: "Address Line 1"
    placeholder: "Pribinova 17954/10"
    type: text
    required: true
  - id: address-2
    label: "Address Line 2"
    hint: "apt. or building"
    placeholder: ""
    type: text
    required: false
  - id: city
    label: "City"
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
    placeholder: "Choose Country…"
    required: true
    select:
      - value: 201
        label: "Slovakia"
      - value: 56
        label: "Czechia"
      - value: 12
        label: "Austria"
      - value: 57
        label: "Germany"
      - value: 43
        label: "Switzerland"
      - value: 189
        label: "Serbia"
  - id: company_id
    label: "Company ID"
    hint: "Optional"
    placeholder: ""
    type: text
    required: false
  - id: tax_id
    label: "Tax ID"
    hint: "Optional"
    placeholder: ""
    type: text
    required: false
  - id: vat_id
    label: "VAT ID"
    hint: "Optional"
    placeholder: ""
    type: text
    required: false

step_3:
  title: Summary
  consents:
    - id: tos
      label:
        text: "I agree to the"
        link: 
          text: "Terms of Service"
          url: "https://gluon.odoo.com/terms"
      required: true
    - id: gdpr
      label:
        text: "I agree to the data processing according to the"
        link:
          text: "Privacy Policy"
          url: "https://gluon.vc/privacy"
      required: true
    - id: nl
      label:
        text: "I want to sign up to the newsletter"

success_message: "Thank you. Within 15 minutes you will recieve an invoice and payment instructions in your inbox."
error_message: "We are sorry, there was a problem submitting your order, please try again later."

---
