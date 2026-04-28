const form = document.querySelector("#post-form");
const postsEl = document.querySelector("#posts");
const messageEl = document.querySelector("#form-message");
const statusEl = document.querySelector("#status");
const refreshButton = document.querySelector("#refresh");
const template = document.querySelector("#post-template");

const fallbackImage =
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80";

const setMessage = (message, isError = false) => {
    messageEl.textContent = message;
    messageEl.classList.toggle("error", isError);
};

const formatDate = (value) => {
    if (!value) return "Just now";
    return new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(value));
};

const loadPosts = async () => {
    postsEl.innerHTML = '<div class="empty">Loading vlogs...</div>';

    try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Could not load vlogs");

        const posts = await response.json();
        statusEl.textContent = "MongoDB connected";
        postsEl.innerHTML = "";

        if (!posts.length) {
            postsEl.innerHTML = '<div class="empty">No vlogs yet. Publish the first one.</div>';
            return;
        }

        posts.forEach((post) => {
            const node = template.content.cloneNode(true);
            const image = node.querySelector(".post-image");
            const meta = node.querySelector(".meta");
            const title = node.querySelector("h3");
            const content = node.querySelector(".content");
            const videoLink = node.querySelector(".video-link");

            image.src = post.imageUrl || fallbackImage;
            image.alt = post.title;
            meta.textContent = `${post.author}${post.location ? ` / ${post.location}` : ""} / ${formatDate(post.createdAt)}`;
            title.textContent = post.title;
            content.textContent = post.content;

            if (post.videoUrl) {
                videoLink.href = post.videoUrl;
            } else {
                videoLink.remove();
            }

            postsEl.appendChild(node);
        });
    } catch (error) {
        statusEl.textContent = "API offline";
        postsEl.innerHTML = '<div class="empty">Start MongoDB and the Node server, then refresh.</div>';
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form));

    submitButton.disabled = true;
    setMessage("Publishing...");

    try {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not publish vlog");

        form.reset();
        setMessage("Vlog published.");
        await loadPosts();
    } catch (error) {
        setMessage(error.message, true);
    } finally {
        submitButton.disabled = false;
    }
});

refreshButton.addEventListener("click", loadPosts);
loadPosts();
