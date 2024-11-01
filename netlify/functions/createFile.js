const fetch = require("node-fetch");

exports.handler = async function(event, context) {
    const repoOwner = "VEDANSH230310";
    const repoName = "voting";
    const branch = "main";
    const filePath = `random_file_${Math.random().toString(36).substr(2, 9)}.txt`;
    const content = Buffer.from("This is a randomly generated file.").toString("base64");

    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${process.env.token}`, // Store in Netlify environment variables
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: "Create new random file",
            content: content,
            branch: branch,
        }),
    });

    const data = await response.json();
    if (response.ok) {
        return {
            statusCode: 200,
            body: JSON.stringify({ path: data.content.path }),
        };
    } else {
        return {
            statusCode: response.status,
            body: JSON.stringify({ message: data.message }),
        };
    }
};
