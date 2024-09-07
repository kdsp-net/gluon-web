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
        - title: "Deal flow"
        - title: "Quarterly pitching events"
        - title: "Online community"
          tooltip: "Get access to our invite-only LinkedIn community and Whatsapp group."
    - name: "Premium"
      id: "premium-membership"
      price: 3000
      multiple: false
      features:
        - title: "All Basic features"
        - title: "Companion tickets"
          tooltip: "Get one free additional non‑investor ticket for each event and the possibility to buy up to 3 more at €200 per person."
        - title: "Shortlist voting"
          tooltip: "Take an early look at our shortlisted startups and vote for the ones that you want to see pitch on the stage"
        - title: "Wildcard"
          tooltip: "Send any one startup directly to pitch on the stage without having to go through the qualification process."
    - name: "Corporate"
      id: "corporate-membership"
      price: 2000
      multiple: true
      features:
        - title: "All Basic features"
        - title: "Companion tickets"
          tooltip: "Every member gets one additional non‑investor ticket for each event and the possibility to buy up to 3 more at €200 per person"
        - title: "Shortlist voting"
          tooltip: "Take an early look at our shortlisted startups and vote for the ones that you want to see pitch on the stage"
        - title: "Wildcard"
          tooltip: "Send any one startup directly to pitch on the stage without having to go through the qualification process."
        - title: "Visibility"
          tooltip: "Get your brand featured on our website and at the events."

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
    placeholder: "Slovakia"
    type: text
    required: true
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
          url: "#"
      required: true
    - id: gdpr
      label:
        text: "I agree to the data processing according to the"
        link:
          text: "Privacy Policy"
          url: "#"
      required: true
    - id: nl
      label:
        text: "I want to sign up to the newsletter"

success_message: "Your order was submitted successfully"
error_message: "We are sorry, there was a problem submitting your order, please try again later."

---
