const filters = document.querySelectorAll(".filter");
const cards = [...document.querySelectorAll(".event-card")];
const searchInput = document.getElementById("eventSearch");
const emptyState = document.getElementById("emptyState");
let activeCategory = "All";

function filterEvents() {
   const term = searchInput.value.trim().toLowerCase();
   let visible = 0;
   cards.forEach((card) => {
      const categoryMatch =
         activeCategory === "All" || card.dataset.category === activeCategory;
      const searchMatch = (
         card.dataset.search +
         " " +
         card.querySelector("h3").textContent
      )
         .toLowerCase()
         .includes(term);
      card.style.display = categoryMatch && searchMatch ? "" : "none";
      if (categoryMatch && searchMatch) visible++;
   });
   emptyState.style.display = visible ? "none" : "block";
}
filters.forEach((button) =>
   button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activeCategory = button.dataset.category;
      filterEvents();
   }),
);
searchInput.addEventListener("input", filterEvents);

let toastTimer;
function showToast(message) {
   const toast = document.getElementById("toast");
   toast.textContent = message;
   toast.classList.add("show");
   clearTimeout(toastTimer);
   toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}
const responseModal = document.getElementById("responseModal");
function showResponse(title, message) {
   document.getElementById("responseTitle").textContent = title;
   document.getElementById("responseMessage").textContent = message;
   responseModal.classList.add("open");
   document.body.style.overflow = "hidden";
   document.getElementById("confirmResponse").focus();
}
function closeResponse() {
   responseModal.classList.remove("open");
   document.body.style.overflow = "";
}
document
   .getElementById("closeResponse")
   .addEventListener("click", closeResponse);
document
   .getElementById("confirmResponse")
   .addEventListener("click", closeResponse);
responseModal.addEventListener("click", (event) => {
   if (event.target === responseModal) closeResponse();
});
document.addEventListener("keydown", (event) => {
   if (event.key === "Escape") closeResponse();
});
document.querySelectorAll(".save-btn").forEach((button) =>
   button.addEventListener("click", () => {
      const saved = button.classList.toggle("saved");
      button.textContent = saved ? "♥" : "♡";
      showToast(
         saved
            ? "Event saved to your favourites"
            : "Removed from your favourites",
      );
   }),
);

const modal = document.getElementById("hostModal");
const openModal = () => {
   modal.classList.add("open");
   document.body.style.overflow = "hidden";
};
const closeModal = () => {
   modal.classList.remove("open");
   document.body.style.overflow = "";
};
document
   .querySelectorAll("[data-open-modal]")
   .forEach((button) => button.addEventListener("click", openModal));
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
   if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
   if (event.key === "Escape") closeModal();
});
document.getElementById("hostForm").addEventListener("submit", (event) => {
   event.preventDefault();
   const hostName = document.getElementById("hostName").value.trim();
   const eventType = document.getElementById("eventType").value;
   closeModal();
   event.target.reset();
   showResponse(
      "Your event idea is in!",
      `Thanks, ${hostName}. Your ${eventType.toLowerCase()} idea has been received.`,
   );
});
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks
   .querySelectorAll("a")
   .forEach((link) =>
      link.addEventListener("click", () => navLinks.classList.remove("open")),
   );

/* ===== Event details view ===== */
const eventDetailsData = {
   "sunset-sounds": {
      title: "Sunset Sounds Rooftop",
      category: "Music · Live",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=85",
      alt: "Outdoor music festival at sunset",
      price: "₹499",
      unit: "/ person",
      date: "Sunday, October 18, 2026",
      time: "6:30 PM – 10:00 PM",
      venue: "Skyline Rooftop",
      city: "City centre · Exact venue shared after RSVP",
      audience: "Music lovers and sunset chasers",
      host: "Gatherly Live",
      description:
         "Close out the day with golden-hour views, a thoughtfully picked soundtrack, and a room full of people ready to enjoy the moment. Come for the music, stay for the atmosphere, and leave with a new favourite memory.",
      highlights: [
         "Live DJ sets and feel-good tracks",
         "Rooftop views around sunset",
         "A relaxed, social atmosphere",
         "Food and drinks available to purchase",
      ],
   },
   "clay-create": {
      title: "Clay & Create Studio",
      category: "Creative · Workshop",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=85",
      alt: "Hands shaping pottery on a wheel",
      price: "₹799",
      unit: "/ person",
      date: "Tuesday, October 20, 2026",
      time: "11:00 AM – 1:30 PM",
      venue: "The Makers Studio",
      city: "Arts district · Venue details shared after RSVP",
      audience: "Beginners and curious makers",
      host: "The Makers Studio",
      description:
         "Take a break from screens and make something with your hands. This beginner-friendly pottery session gives you room to experiment, learn the basics, and enjoy the process rather than chasing perfection.",
      highlights: [
         "Guided introduction to working with clay",
         "All basic tools and materials provided",
         "A small handmade piece to take home later",
         "No previous pottery experience needed",
      ],
   },
   "mindful-mornings": {
      title: "Mindful Mornings",
      category: "Wellness · Outdoors",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=85",
      alt: "Person meditating outdoors",
      price: "₹299",
      unit: "/ person",
      date: "Saturday, October 24, 2026",
      time: "7:00 AM – 8:30 AM",
      venue: "Greenview Garden",
      city: "Outdoor meeting point shared after RSVP",
      audience: "All levels welcome",
      host: "Slow Start Collective",
      description:
         "Give yourself a softer start to the day with gentle movement, guided breathing, and a little time outdoors. This is a welcoming space to slow down, reconnect, and start the weekend with intention.",
      highlights: [
         "Gentle, beginner-friendly movement",
         "Guided breathing and quiet reflection",
         "Outdoor setting with a relaxed pace",
         "Bring a mat and a bottle of water",
      ],
   },
   "table-stories": {
      title: "Table Stories Supper Club",
      category: "Food · Social",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85",
      alt: "Warmly lit restaurant dining space",
      price: "₹1,199",
      unit: "/ person",
      date: "Sunday, October 25, 2026",
      time: "7:30 PM – 10:00 PM",
      venue: "The Common Table",
      city: "Dining district · Full address shared after RSVP",
      audience: "Foodies and friendly strangers",
      host: "Table Stories",
      description:
         "A shared table can turn strangers into friends. Enjoy a relaxed supper club built around good food, conversation, and the joy of discovering what happens when different people sit down together.",
      highlights: [
         "A curated shared dining experience",
         "Conversation prompts for easy introductions",
         "A welcoming table for solo guests too",
         "Menu and dietary details confirmed before the event",
      ],
   },
   "vinyl-nights": {
      title: "Vinyl Nights: Side A",
      category: "Music · Nightlife",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85",
      alt: "Crowd at a concert under colourful lights",
      price: "₹399",
      unit: "/ person",
      date: "Thursday, October 29, 2026",
      time: "8:00 PM – 11:30 PM",
      venue: "The Listening Room",
      city: "Central district · Venue details shared after RSVP",
      audience: "Record collectors and music fans",
      host: "Gatherly After Dark",
      description:
         "A night for deep cuts, familiar favourites, and songs that sound even better in a room full of people. Bring your curiosity, find a spot near the speakers, and let the music take over.",
      highlights: [
         "A vinyl-inspired music selection",
         "Warm lighting and an intimate atmosphere",
         "Space to meet fellow music fans",
         "Smart casual dress and good vibes",
      ],
   },
   "idea-exchange": {
      title: "The Idea Exchange",
      category: "Creative · Community",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1400&q=85",
      alt: "People collaborating at a creative meetup",
      price: "Free",
      unit: "/ RSVP",
      date: "Monday, November 2, 2026",
      time: "10:30 AM – 12:30 PM",
      venue: "Open Studio Hub",
      city: "Creative quarter · Exact venue shared after RSVP",
      audience: "Builders, makers, and curious minds",
      host: "Gatherly Community",
      description:
         "Bring a question, a half-formed idea, or a project you're excited about. This friendly meetup makes space for thoughtful conversations, fresh perspectives, and connections that can turn a spark into something more.",
      highlights: [
         "Small-group idea-sharing sessions",
         "Meet people from different disciplines",
         "Bring a project or just your curiosity",
         "Free entry with advance RSVP",
      ],
   },
};

const eventListingView = document.querySelector("main:not(#detailsPage)");
const detailsPage = document.getElementById("detailsPage");
const sharedFooter = document.querySelector("body > footer");
const originalTitle = document.title;

function showEventDetails(eventId) {
   const data = eventDetailsData[eventId];
   if (!data) return;
   document.getElementById("eventContent").hidden = false;
   document.getElementById("eventNotFound").hidden = true;
   document.getElementById("eventImage").src = data.image;
   document.getElementById("eventImage").alt = data.alt;
   document.getElementById("eventCategory").textContent = data.category;
   document.getElementById("eventTitle").textContent = data.title;
   document.getElementById("eventPrice").textContent = data.price;
   document.getElementById("priceUnit").textContent = data.unit;
   document.getElementById("eventDate").textContent = data.date;
   document.getElementById("eventTime").textContent = data.time;
   document.getElementById("eventVenue").textContent = data.venue;
   document.getElementById("eventCity").textContent = data.city;
   document.getElementById("eventAudience").textContent = data.audience;
   document.getElementById("eventHost").textContent = data.host;
   document.getElementById("eventDescription").textContent = data.description;
   const list = document.getElementById("eventHighlights");
   list.replaceChildren();
   data.highlights.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
   });
   document.title = `${data.title} — Gatherly`;
   eventListingView.hidden = true;
   detailsPage.hidden = false;
   sharedFooter.hidden = false;
   window.scrollTo({ top: 0, behavior: "smooth" });
   history.pushState({ view: "details", eventId }, "", `#details/${eventId}`);
}

function showListing(updateHistory = true) {
   detailsPage.hidden = true;
   eventListingView.hidden = false;
   document.title = originalTitle;
   if (updateHistory) history.pushState({ view: "listing" }, "", "#events");
   window.scrollTo({
      top: document.getElementById("events").offsetTop - 80,
      behavior: "smooth",
   });
}

document.querySelectorAll("[data-event]").forEach((link) => {
   link.addEventListener("click", (event) => {
      event.preventDefault();
      showEventDetails(link.dataset.event);
   });
});
document.querySelectorAll("#detailsPage .back-link").forEach((link) => {
   link.addEventListener("click", (event) => {
      event.preventDefault();
      showListing();
   });
});
document.querySelectorAll('#detailsPage a[href="#events"]').forEach((link) => {
   link.addEventListener("click", (event) => {
      event.preventDefault();
      showListing();
   });
});
window.addEventListener("popstate", (event) => {
   if (event.state && event.state.view === "details") {
      showEventDetailsWithoutHistory(event.state.eventId);
   } else {
      detailsPage.hidden = true;
      eventListingView.hidden = false;
      document.title = originalTitle;
   }
});
function showEventDetailsWithoutHistory(eventId) {
   const data = eventDetailsData[eventId];
   if (!data) return;
   showEventDetailsNoHistory(data);
}
function showEventDetailsNoHistory(data) {
   document.getElementById("eventImage").src = data.image;
   document.getElementById("eventImage").alt = data.alt;
   document.getElementById("eventCategory").textContent = data.category;
   document.getElementById("eventTitle").textContent = data.title;
   document.getElementById("eventPrice").textContent = data.price;
   document.getElementById("priceUnit").textContent = data.unit;
   document.getElementById("eventDate").textContent = data.date;
   document.getElementById("eventTime").textContent = data.time;
   document.getElementById("eventVenue").textContent = data.venue;
   document.getElementById("eventCity").textContent = data.city;
   document.getElementById("eventAudience").textContent = data.audience;
   document.getElementById("eventHost").textContent = data.host;
   document.getElementById("eventDescription").textContent = data.description;
   const list = document.getElementById("eventHighlights");
   list.replaceChildren();
   data.highlights.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
   });
   document.title = `${data.title} — Gatherly`;
   eventListingView.hidden = true;
   detailsPage.hidden = false;
   window.scrollTo({ top: 0 });
}

/* ===== Demo reservation form ===== */
const reserveModal = document.getElementById("reserveModal");
const openReserve = () => {
   document.getElementById("reserveTitle").textContent =
      `Reserve ${document.getElementById("eventTitle").textContent}`;
   reserveModal.classList.add("open");
   document.body.style.overflow = "hidden";
};
const closeReserve = () => {
   reserveModal.classList.remove("open");
   document.body.style.overflow = "";
};
document.getElementById("reserveButton").addEventListener("click", openReserve);
document.getElementById("bottomReserve").addEventListener("click", openReserve);
document.getElementById("closeReserve").addEventListener("click", closeReserve);
reserveModal.addEventListener("click", (e) => {
   if (e.target === reserveModal) closeReserve();
});
document.addEventListener("keydown", (e) => {
   if (e.key === "Escape") closeReserve();
});
document.getElementById("reserveForm").addEventListener("submit", (e) => {
   e.preventDefault();
   const name = document.getElementById("attendeeName").value.trim();
   const count = document.getElementById("ticketCount").value;
   const eventTitle = document.getElementById("eventTitle").textContent;
   closeReserve();
   e.target.reset();
   showResponse(
      "You're on the list!",
      `Thanks, ${name}. Your interest in ${eventTitle} for ${count} attendee${count === "1" ? "" : "s"} has been recorded. No ticket or payment has been created.`,
   );
});
