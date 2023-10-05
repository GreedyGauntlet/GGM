function ParseGGM(ggm_content) {
    let lines = ggm_content.split('\n');
    let outputHTML = "";
    for (let line of lines) {
        let lineclass = GetHeaderClass(line);
        let cleanline = GetCleanLine(line);
        if (line[0] == '\r' || line[0] == '\n' || line.length == 0) outputHTML += "<br>";
        else {
            outputHTML += `<div class="${lineclass}">${cleanline}</div>`
        }
        console.log(lineclass);
    }
    return `<div class="ggm">${outputHTML}</div>`;
}

function GetHeaderClass(line) {
    let headercount = -1;
    let bulletcount = 0;
    let baseclass = "";
    for (let c of line)
        if (c == '-')
            bulletcount++;
        else break;
    if (bulletcount > 0)
        baseclass += `ggm_bullet${bulletcount} `;
    for (let c of line)
        if (c =='>')
            headercount++;
        else break;
    if (headercount < 0) return `${baseclass} ggm_text`;
    if (headercount == 0) return `${baseclass} ggm_title`;
    return `${baseclass} ggm_header ggm_header${headercount}`;
}

function GetCleanLine(line) {
    let count = 0;
    for (let c of line)
        if (c =='>')
            count++;
        else break;
    line = line.substring(count);
    line = GetBulletPoint(line);
    return line;
}

function GetBulletPoint(line) {
    if (line.startsWith("-")) {
        while (line.startsWith("-")) {
            line = line.substring(1);
        }
        return "• " + line;
    } else {
        return line;
    }
}