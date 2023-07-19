const moment = require('moment')
const orderModel = require('../../models/Order');
const Adminauth = require("../../models/Adminauth");

const dashboardData = async (req, res) => {
    const before7daysDate = moment().subtract(7, 'd').format('MM/DD/YYYY')
    const before30daysDate = moment().subtract(30, 'd').format('MM/DD/YYYY')

    const aggregation = [
        {
            '$group': {
                '_id': null,
                'totalAmount': {
                    '$sum': '$amount'
                }
            }
        }, {
            '$lookup': {
                'from': 'classes',
                'let': {},
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$or': [
                                    {}
                                ]
                            }
                        }
                    }, {
                        '$lookup': {
                            'from': 'users',
                            'localField': 'user_id',
                            'foreignField': '_id',
                            'as': 'user'
                        }
                    }, {
                        '$lookup': {
                            'from': 'astrologers',
                            'localField': 'astrologer_id',
                            'foreignField': '_id',
                            'as': 'astrologer'
                        }
                    }
                ],
                'as': 'classes'
            }
        }, {
            '$lookup': {
                'from': 'users',
                'let': {},
                'pipeline': [
                    {
                        '$match': {
                            '$expr': {
                                '$or': [
                                    {}
                                ]
                            }
                        }
                    }
                ],
                'as': 'users'
            }
        }, {
            '$addFields': {
                'totalUsers': {
                    '$size': '$users'
                },
                'totalClasses': {
                    '$size': '$classes'
                }
            }
        }, {
            '$unwind': {
                'path': '$classes',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$unwind': {
                'path': '$users',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$sort': {
                'classes.created_at': -1,
                'users.created_at': -1
            }
        }, {
            '$limit': 10
        }, {
            '$group': {
                '_id': null,
                'totalAmount': {
                    '$first': '$totalAmount'
                },
                'totalUsers': {
                    '$first': '$totalUsers'
                },
                'totalClasses': {
                    '$first': '$totalClasses'
                },
                'users': {
                    '$push': '$users'
                },
                'classes': {
                    '$push': '$classes'
                }
            }
        }
    ]

    const condition = [
        {
            '$addFields': {
                'currentDate': {
                    '$dateToString': {
                        'format': '%m/%d/%Y',
                        'date': new Date()
                    }
                }
            }
        }, {
            '$match': {
                '$expr': {
                    '$eq': [
                        '$created_at', '$currentDate'
                    ]
                }
            }
        }, {
            '$group': {
                '_id': null,
                'todayAmount': {
                    '$sum': '$amount'
                }
            }
        }
    ]

    const condition7 = [
        {
            '$addFields': {
                'created_at': {
                    '$toDate': '$created_at'
                },
                'currentDate': {
                    '$toDate': before7daysDate
                }
            }
        }, {
            '$match': {
                '$expr': {
                    '$gte': [
                        '$created_at', '$currentDate'
                    ]
                }
            }
        }, {
            '$group': {
                '_id': null,
                'todayAmount': {
                    '$sum': '$amount'
                }
            }
        }
    ]

    const condition30 = [
        {
            '$addFields': {
                'created_at': {
                    '$toDate': '$created_at'
                },
                'currentDate': {
                    '$toDate': before30daysDate
                }
            }
        }, {
            '$match': {
                '$expr': {
                    '$gte': [
                        '$created_at', '$currentDate'
                    ]
                }
            }
        }, {
            '$group': {
                '_id': null,
                'todayAmount': {
                    '$sum': '$amount'
                }
            }
        }
    ]

    try {
        const dashboardData = await orderModel.aggregate(aggregation);
        const todayOrderData = await orderModel.aggregate(condition);
        const last7daysAmount = await orderModel.aggregate(condition7);
        const last30daysAmount = await orderModel.aggregate(condition30);
        const admin = await Adminauth.find({});
        return res.render("admin/dashboard", { dashboardData, todayOrderData, last7daysAmount, last30daysAmount, admin });
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.dashboardData = dashboardData;