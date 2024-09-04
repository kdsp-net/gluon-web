---
title: "Join"
meta_title: ""
description: "this is meta description"
draft: false
pricing:
  title: "Choose your plan"
  subtitle: "7 Days free trial. No credit card required."
  plans:
    - name: "Basic"
      id: "basic-membership"
      price: 1000
      isPopular: false
      popularText: "MOST POPULAR"
      features:
        - title: "Deal flow"
        - title: "Quarterly pitching events"
        - title: "Online community"
          tooltip: "Get access to our invite-only LinkedIn community and Whatsapp group."
      link: "#"
    - name: "Premium"
      id: "premium-membership"
      price: 3000
      features:
        - title: "All Basic features"
        - title: "Companion tickets"
          tooltip: "Get one free additional non‑investor ticket for each event and the possibility to buy up to 3 more at €200 per person."
        - title: "Shortlist voting"
          tooltip: "Take an early look at our shortlisted startups and vote for the ones that you want to see pitch on the stage"
        - title: "Wildcard"
          tooltip: "Send any one startup directly to pitch on the stage without having to go through the qualification process."
      link: "#"
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
      link: "#"
form:
  - id: first_name
    label: "First Name"
    placeholder: "John"
    type: text
    required: true
  - id: last_name
    label: "Last Name"
    placeholder: "Appleseed"
    type: text
    required: true
  - id: company
    label: "Company (optional)"
    placeholder: "Gluon Syndicate, s. r. o."
    type: text
    required: false
  - id: address-1
    label: "Address (1st line)"
    placeholder: "Pribinova 17954/10"
    type: text
    required: true
  - id: address-1
    label: "Address (2nd line)"
    placeholder: "Apt. or building"
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
    label: "Company ID (Optional)"
    placeholder: ""
    type: text
    required: false
  - id: tax_id
    label: "Tax ID (Optional)"
    placeholder: ""
    type: text
    required: false
  - id: vat_id
    label: "VAT ID (Optional)"
    placeholder: ""
    type: text
    required: false

---