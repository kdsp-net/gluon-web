+++
title = "Ako investujeme?"
meta_title = "Ako investujeme?"
+++

Investičný proces Gluon Syndicate je navrhnutý tak, aby podporoval transparentnosť, spravodlivosť a efektivitu, pričom zlaďuje záujmy zakladateľov aj investorov. Či už ste zakladateľ hľadajúci financovanie alebo investor skúmajúci príležitosti, náš štruktúrovaný proces zabezpečuje jasnosť a hodnotu v každom kroku. Tu je jeho základný prehľad:

```mermaid

flowchart TD

inbound("Prichádzajúce")
events("Startupové akcie & sieť")
accelerators("Akcelerátory & inkubátory")
members("Členovia syndikátu")
inbox("Inbox")
prescreening("Pre-screening")
screening("Screening")
selectedForEvent("Vybrané pre event")
shortlist("Krátky zoznam")
vc("VC fondy")
followup("Followup")
archive("Archív")
firstRound("Pitch")
secondRound("Prezentácia byznis modelu")
overtime("Overtime")
dueDiligence("Due diligence")
note("CLA alebo SAFE")
qualifiedRound("Kapitálové kolo")
conversion("Konverzia")
subsequentRounds("Následné kolá")
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

subgraph sourcing[Sourcing]
  inbound
  events
  accelerators
  vc
  members
end

vc <-. "Co-investícia" .-> selection
sourcing ==> selection

subgraph selection[Výber]
  direction LR
  inbox --> prescreening
  prescreening --> screening
  screening --> shortlist
  shortlist --> selectedForEvent
end 

selection <--> followup
selection ==> event
selection --> archive

members -. "Divoké karty" .-> event  

subgraph event[Pitch Event]
  direction LR
  firstRound --> secondRound
  secondRound .-> overtime
end 

event ==> investment  

subgraph investment[Investícia]
  direction LR
  dueDiligence --> note
  note --> qualifiedRound
  qualifiedRound --> conversion
end

investment ==> subsequentRounds
subsequentRounds ==> exit

```

#### 1. [Sourcing](https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Sourcing)

Startupy získavame z rôznych kanálov, vrátane prichádzajúcich žiadostí, startupových udalostí, partnerstiev s akcelerátormi a inkubátormi, odporúčaní od členov syndikátu a prepojení s VC fondmi.

#### 2. [Výber](https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Selection)

Startupy prechádzajú dôkladným hodnotiacim procesom, ktorý zahŕňa predbežný screening, screening a vytvorenie užšieho zoznamu pred výberom na prezentáciu na jednej z našich štvrťročných pitch udalostí.

#### 3. [Pitch Events](https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Pitch+Events)

Startupy predstavujú svoju víziu a ciele v dvojkolovej prezentácii, kde investori prejavujú záujem a robia záväzky prostredníctvom našej aplikácie.

#### 4. [Investícia](https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Investment)

Startupy, ktoré dosiahnu svoje investičné ciele, prechádzajú due diligence, po ktorej sú investície realizované buď prostredníctvom [CLA (Convertible Loan Agreement)](https://kb.gluon.vc/Knowledge+Base/CLA+(Convertible+Loan+Agreement)) alebo [SAFE (Simple Agreement for Future Equity)](https://kb.gluon.vc/Knowledge+Base/SAFE+(Simple+Agreement+for+Future+Equity)).

#### 5. [Následné kolá a exit](https://kb.gluon.vc/Knowledge+Base/How+We+Invest/Subsequent+Rounds+and+Exit)

Podporujeme startupy v ich raste a zabezpečení budúceho financovania, pričom využívame našu sieť na ich prepojenie s inštitucionálnymi investormi. Naším cieľom je úspešný exit, či už akvizíciou, IPO alebo inými strategickými príležitosťami, s obvyklým investičným horizontom 7–10 rokov.

{{< notice "tip" >}}
Podrobný popis každej fázy nájdete v našej **[Znalostnej báze (EN)](https://kb.gluon.vc/)**
{{< /notice >}}

---