const WHATSAPP = "5548988544408";

document.getElementById("year").textContent = new Date().getFullYear();

const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
toggle?.addEventListener("click", () => links.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const dateInput = document.getElementById("date");
const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
dateInput.min = today.toISOString().slice(0,10);

function toast(msg){
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),2400);
}

document.getElementById("reservationForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const people = document.getElementById("people").value;
  const note = document.getElementById("note").value.trim();

  if(!name || !date || !time || !people) return;

  const selected = new Date(`${date}T${time}:00`);
  const hour = selected.getHours() + selected.getMinutes()/60;
  if(hour < 11 || hour > 14){
    toast("Escolha um horário entre 11h e 14h.");
    return;
  }

  const [y,m,d] = date.split("-");
  const dateBR = `${d}/${m}/${y}`;
  let message =
`Olá! Gostaria de solicitar uma reserva no Restaurante Hangar.

✈️ Nome: ${name}
📅 Data: ${dateBR}
🕐 Horário: ${time}
👥 Pessoas: ${people}`;

  if(note) message += `\n📝 Observação: ${note}`;
  message += `\n\nAguardo a confirmação da disponibilidade.`;

  toast("Abrindo o WhatsApp…");
  setTimeout(() => {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  }, 450);
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", () => {
    const target = document.querySelector(a.getAttribute("href"));
    if(target) setTimeout(()=>window.scrollTo({top:target.offsetTop - 90, behavior:"smooth"}),0);
  });
});
