const  generateRdStr=(e: any)=> {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < e; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export {generateRdStr}