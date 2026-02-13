// ==========================================
// 📸 CONFIGURE YOUR PHOTOS, VIDEOS & MUSIC HERE
// ==========================================
// Just edit the arrays below — no need to touch any other code!

export interface PhotoItem {
  src: string;
  caption: string;
}

export interface VideoItem {
  src: string;
  caption: string;
}

// Add your photos here. Place the actual files in public/photos/
export const photos: PhotoItem[] = [
  
  { src: "/photos/firstdate.jpeg", caption: "Where our forever began 💕" },
  { src: "/photos/firstvalentine.jpeg", caption: "The first of a lifetime of heartbeats together 🌹" },
  { src: "/photos/firstnightout.jpeg", caption: "Dancing through life as long as I’m with you ✨" },
  { src: "/photos/favapartment.jpeg", caption: "My favorite view in every room is you 🏠💞" },
  { src: "/photos/songkran.jpeg", caption: "Our first Thingyan 💦😊" },
  { src: "/photos/mybd.jpeg", caption: "The best gift was you choosing me 🎁💖" },
  { src: "/photos/shunbd.jpeg", caption: "Two hearts, one soul, and a love that grows 💕" },
  { src: "/photos/aqurium.jpeg", caption: "In a sea of people, my eyes are always on you 🐠💎" },
  { src: "/photos/caringgf.jpeg", caption: "My safe haven in a chaotic world 🥰" },
  { src: "/photos/mirror.jpeg", caption: "Just a reminder of how lucky I am to have you 🪞✨" },
  { src: "/photos/newyear.jpeg", caption: "A new year, but the same beautiful 'us' 🌃🎆" },
  { src: "/photos/Khaoyai.jpeg", caption: "High in the mountains, but even higher on your love ⛰️☁️" },
  { src: "/photos/Bangsean.jpeg", caption: "Let the waves hit my feet, but keep your hand in mine 🌊💙" },
  { src: "/photos/Kanchanaburi.jpeg", caption: "Chasing sunsets and dreams with my favorite person 🌅🧡" },
  { src: "/photos/2anni.jpeg", caption: "Two years down, a thousand more to go. I love you 💕🎉💕" }
];

// Add your videos here. Place the actual files in public/videos/
export const videos: VideoItem[] = [
  { src: "/videos/Video.mp4", caption: "Our special moment 🎬" }
];

// Background music file. Place it in public/music/
export const backgroundMusic = "/music/background.mp3";
