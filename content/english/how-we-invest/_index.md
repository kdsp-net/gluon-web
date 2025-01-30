+++
title = "How We Invest?"
categories = [ "For Startups", "For Investors",]
tags = [ "process", "conditions", "policy", "raising capital", "sourcing", "selection", "event", "investment",]
meta_title = "How We Invest?"
+++

Gluon Syndicate’s investment process is designed to foster transparency, fairness, and efficiency while aligning the interests of both founders and investors. Whether you are a founder seeking funding or an investor exploring opportunities, our structured process ensures clarity and value at every step. Here’s a high-level breakdown:

1. **[Sourcing](https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Sourcing)**: We source startups from diverse channels, including inbound applications, startup events, partnerships with accelerators and incubators, referrals from syndicate members, and connections with VC funds.
2. **[Selection](https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Selection)**: Startups go through a thorough evaluation process, including pre-screening, screening, and shortlisting, before being selected to pitch at one of our quarterly pitch events.
3. **[Pitch Events](https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Pitch+Events)**: Startups present their vision and goals in a two-round pitch event, where investors express interest and make commitments using our streamlined app.
4. **[Investment](https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Investment)**: Startups that meet their funding goals enter due diligence, after which investments are made through either [[CLA (Convertible Loan Agreement)]] or [[SAFE (Simple Agreement for Future Equity)]].
5. **[Subsequent Rounds and Exit](https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Subsequent+Rounds+and+Exit)**: We support startups as they grow and secure future funding, leveraging our network to connect them with institutional investors. Our goal is a successful exit, whether through acquisition, IPO, or other strategic opportunities, with a typical investment horizon of 7-10 years.

```mermaid

flowchart TD

inbound("Inbound")
events("Startup Events & Network")
accelerators("Accelerators & Incubators")
members("Syndicate Members")
inbox("Inbox")
prescreening("Pre-screening")
screening("Screening")
selectedForEvent("Selected for Event")
shortlist("Shortlist")
vc("VC Funds")
followup("Follow Up")
archive("Archive")
firstRound("Pitch")
secondRound("Business Model Presentation")
eovertime("Overtime")
dueDiligence("Due Diligence")
note("CLA or SAFE")
qualifiedRound("Equity Round")
conversion("Conversion")
subsequentRounds("Subsequent Rounds")
exit("EXIT") 

click members href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Sourcing#Syndicate+Members"
click events href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Sourcing#Startup+Events+%26+Network"
click accelerators href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Sourcing#Accelerators+%26+Incubators"
click inbound href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Sourcing#Inbound"
click vc href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Sourcing#VC+Funds"
click inbox href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Selection#Inbox"
click prescreening href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Selection#Pre-Screening"
click screening href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Selection#Screening"
click shortlist href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Selection#Shortlist"
click selectedForEvent href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Selection#Selected+for+Event"
click firstRound href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Pitch+Events#Pitch"
click secondRound href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Pitch+Events#Business+Model+Presentation"
click overtime href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Pitch+Events#Overtime"
click dueDiligence href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Investment#Due+Diligence"
click note href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Investment#CLA+or+SAFE"
click qualifiedRound href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Investment#Equity+Round"
click conversion href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Investment#Conversion"
click subsequentRounds href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Subsequent+Rounds+and+Exit#Subsequent+Rounds"
click exit href "https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Subsequent+Rounds+and+Exit#Exit"

subgraph sourcing
  inbound
  events
  accelerators
  vc
  members
end

vc <-. "Co-investments" .-> selection
sourcing ==> selection

subgraph selection
  direction LR
  inbox --> prescreening
  prescreening --> screening
  screening --> shortlist
  shortlist --> selectedForEvent
end 

selection <--> followup
selection ==> event
selection --> archive

members -. "Wildcards" .-> event  

subgraph event
  direction LR
  firstRound --> secondRound
  secondRound .-> overtime
end 

event ==> investment  

subgraph investment
  direction LR
  dueDiligence --> note
  note --> qualifiedRound
  qualifiedRound --> conversion
end

investment ==> subsequentRounds
subsequentRounds ==> exit

```
 
{{< notice "tip" >}}
You can find more information in our **[Knowledge Base](https://kb.gluon.vc/)**
{{< /notice >}}

---