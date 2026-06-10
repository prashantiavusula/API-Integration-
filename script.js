const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");
const profile = document.getElementById("profile");

async function getProfile() {

    const username = usernameInput.value.trim();

    if (username === "") {

        profile.innerHTML = `
            <p class="error">
                ⚠ Please enter a GitHub username
            </p>
        `;

        return;
    }

    profile.innerHTML = `
        <div class="loader"></div>
    `;

    try {

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();

        profile.innerHTML = `
            <div class="profile-card">

                <img
                    src="${data.avatar_url}"
                    alt="${data.login}"
                >

                <h2>
                    ${data.name || "No Name Available"}
                </h2>

                <p class="username">
                    @${data.login}
                </p>

                <p class="bio">
                    ${data.bio || "No bio available"}
                </p>

                <div class="stats">

                    <div class="stat">
                        👥
                        <strong>${data.followers}</strong>
                        Followers
                    </div>

                    <div class="stat">
                        ➕
                        <strong>${data.following}</strong>
                        Following
                    </div>

                    <div class="stat">
                        📁
                        <strong>${data.public_repos}</strong>
                        Repositories
                    </div>

                </div>

                <p class="joined">
                    📅 Joined:
                    ${new Date(
                        data.created_at
                    ).toLocaleDateString()}
                </p>

                <a
                    href="${data.html_url}"
                    target="_blank"
                    class="profile-link"
                >
                    🚀 View GitHub Profile
                </a>

            </div>
        `;

    }
    catch (error) {

        profile.innerHTML = `
            <p class="error">
                ❌ User not found.
                Please try another username.
            </p>
        `;

        console.error(error);
    }
}

searchBtn.addEventListener(
    "click",
    getProfile
);

usernameInput.addEventListener(
    "keypress",
    function(e){

        if(e.key === "Enter"){
            getProfile();
        }

    }
);