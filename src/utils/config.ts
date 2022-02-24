const checkFrequencyData = [{
    label: "5分钟",
    value: 300
}, {
    label: "10分钟",
    value: 600,
}, {
    label: "15分钟",
    value: 900
}, {
    label: "30分钟",
    value: 1800,
}, {
    label: "60分钟",
    value: 3600,
}];

const httpMethodData = [{
    label: "GET",
    value: 1
}, {
    label: "POST",
    value: 2
}, {
    label: "PUT",
    value: 3
}, {
    label: "PATCH",
    value: 4
}, {
    label: "DELETE",
    value: 5
}, {
    label: "HEAD",
    value: 6
}, {
    label: "OPTIONS",
    value: 7
}, ];

const bodyTypeData = [{
    label: "Raw",
    value: 1
}, {
    label: "JSON",
    value: 2
}, {
    label: "Form Params",
    value: 3
}];

const teamRoleData=[
    {
        label:"普通用户",
        value:1
    },
    {
        label:"创建者",
        value:2,
    },
    {
        label:"管理员",
        value:3,
    }
];

const webMonitorTypeData=[
    {
        label:"HTTP状态码",
        value:1
    },
    {
        label:"内容关键词",
        value:2
    }
]

const serverMonitorTypeData=[
    {
        label:"PING",
        value:1
    },
    {
        label:"服务器状态",
        value:2
    }
]
const apiMonitorTypeData=[
    {
        label:"HTTP状态码",
        value:1
    },
    {
        label:"返回值断言",
        value:2
    }
]
const checkSSLData=[
    {
        label:"不检查",
        value:0,
    },
    {
        label:"检查",
        value:1,
    }
]

const checkWHOISData=[
    {
        label:"不检查",
        value:0,
    },
    {
        label:"检查",
        value:1,
    }
]

const notificationTypeData=[
    {
        label:"邮件",
        value:1,
    },
    // {
    //     label:"手机",
    //     value:2,
    // },
    // {
    //     label:"短信",
    //     value:3,
    // },
    {
        label:"Telegram",
        value:4,
    },{
        label:"Bark",
        value:5,
    },
    {
        label:"Server酱",
        value:6,
    },
    // {
    //     label:"webhook",
    //     value:7,
    // }
]

const deviceStatusData=[
    {
        label:"可用",
        value:1,
    },
    {
        label:"归档",
        value:2,
    },
    {
        label:"暂停",
        value:3,
    }
]

const dnsTypeData=[
    {
        label:'A',
        value:1,
    },
    {
        label:'AAAA',
        value:2,
    },
    {
        label:'CAA',
        value:3,
    },
    {
        label:'CNAME',
        value:4,
    },
    {
        label:'MX',
        value:5,
    },
    {
        label:'NS',
        value:6,
    },
    {
        label:'PTR',
        value:7,
    },
    {
        label:'SOA',
        value:8,
    },
    {
        label:'SRV',
        value:9,
    },
    {
        label:'TXT',
        value:10,
    }
]

const deviceTypeData=[
    {label:"网站",value:1},
    {label:"服务器",value:2},
    {label:"接口",value:3},
    {label:"TCP Port",value:4},
    {label:"DNS监控",value:5},
    {label:"心跳监控",value:6},
    {label:"Steam Game Server",value:7},
    {label:"Minecraft Server",value:8},
]

const monitorRegionData=[
    {label:"默认",value:1},
]

const platformVersionData=[
    {label:"Java版",value:1},
    {label:"基岩版",value:2}
]

export {
    checkFrequencyData,
    httpMethodData,
    bodyTypeData,
    teamRoleData,
    webMonitorTypeData,
    serverMonitorTypeData,
    apiMonitorTypeData,
    checkSSLData,
    checkWHOISData,
    notificationTypeData,
    deviceStatusData,
    dnsTypeData,
    deviceTypeData,
    monitorRegionData,
    platformVersionData,
};