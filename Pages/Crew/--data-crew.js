export const crews = [
    {
        name:"Douglas Hurley",
        role:"Commander",
        presentation:"Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
        image:"/Assets/Crew/douglasHurley.png",
        selected:true,
    },
    {
        name:"Mark ShuttleWorth",
        role:"Mission Specialist",
        presentation:"Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
        image:"/Assets/Crew/markShuttleworth.png",
        selected:false,

    },
    {
        name:"Victor Glover",
        role:"Pilot",
        presentation:"Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.",
        image:"/Assets/Crew/victorGlover.png",
        selected:false,

    },
    {
        name:"Anousheh Ansari",
        role:"Flight Engineer",
        presentation:"Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
        image:"/Assets/Crew/anoushehAnsari.png",
        selected:false,
    },
]





// class CrewBember{

//     constructor(name, role, presentation, image, selected){
//         this.name = name
//         this.role = role
//         this.presentation = presentation
//         this.image = image
//         this.selected = selected
//     }
// }

// const Douglas = new CrewBember(
//     "Douglas Hurley",
//     "Commander",
//     "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
//     "/Assets/Crew/douglasHurley.png",
//     true
// )
// const Mark = new CrewBember(
//     "Mark ShuttleWorth",
//     "Mission Specialist",
//     "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
//     "/Assets/Crew/markShuttleworth.png",
//     false
// )
// const Victor = new CrewBember(
//     "Victor Glover",
//     "Pilot",
//     "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.",
//     "/Assets/Crew//victorGlover.png",
//     false
// )
// const Anousheh = new CrewBember(
//     "Anousheh Ansari",
//     "Flight Engineer",
//     "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
//     "/Assets/Crew/anoushehAnsari.png",
//     false
// )

// const crewMembers = [Douglas, Mark, Victor, Anousheh]


// export const crews = crewMembers.map(member => ({
//     name:member.name,
//     role:member.role,
//     presentation:member.presentation,
//     image:member.image,
//     selected:member.selected,
// }))