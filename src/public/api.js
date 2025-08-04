document.getElementById("fetchBtn").onclick = async function () {
    const res = await fetch("/");
    const data = await res.json();
    document.getElementById("result").textContent = JSON.stringify(
        data,
        null,
        2
    );
};