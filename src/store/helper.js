const staticData = {
    data: [
        {
            title: 'Overview:',
            value: 'The Credit Line Decrease (CLD) model is used to identify high risks accounts with\n' +
                'the objective to mitigate potential losses by decreasing their credit limit. The\n' +
                'model will be used on all the RRB credit card customers.\n' +
                'RRB branded credit card is a core product of RRB and accounts for ~$90 million\n' +
                'ANR with ~20 million open accounts till Dec’22.\n' +
                'The model has been built using Dec 2018 development vintage. February 2018\n' +
                'and April 2019 has been used for out-of-time (OOT) validations. The model has\n' +
                'been built on entire card customers except for the customers whose past 12\n' +
                'months historical data is not known.\n' +
                'The model estimates the likelihood of an account having a status of 60+ days\n' +
                'past due at the end of 18 months (classified as ‘bad’ hereafter in this document).\n' +
                'The model has been built on both internal as well as external data. The external\n' +
                'credit bureau data is received monthly through a batch process for the Existing\n' +
                'Card Members (ECM). In addition, the model leverages daily data – daily\n' +
                'bureau (in addition to batch bureau), daily triggers and a few daily on-us\n' +
                'attributes – to allow the identification of high risk accounts before they utilize the\n' +
                'remaining open-to-buy amount.'
        },
        {
            title: 'Performance Definition:',
            value: 'The model uses performance definition of ‘Bucket 3+ at the end of 18 months’.\n' +
                'This definition has been obtained on the basis of a business analysis conducted\n' +
                'with a terminal window of 24 months. A greater emphasis has been made on\n' +
                'keeping the false positive rate lower given that Credit Line Decrease is a\n' +
                'negative action to a customer. The business analysis is also supported by\n' +
                'statistical analysis on the choice of target variable definition. In addition,\n' +
                'forbearance, re-age and settlements in 18 months has been classified as bads.\n' +
                'To minimize overlap between Good/Bad characteristics, ‘indeterminate has\n' +
                'been assigned in the model development. Accounts with Bucket 2 at the end of\n' +
                'performance window has been tagged as ‘indeterminate’ as accounts have\n' +
                'higher false positive rate (~50%), but belongs to a negative segment.'
        },
        {
            title: 'Vintage Selection:',
            value: 'The model Risk Score shows incremental model performance compared to other\n' +
                '                        benchmarks. While there is no direct benchmark available for the CLD model\n' +
                '                        since it’s a bespoke score, it is still compared to the other scores, since they are\n' +
                '                        being used in the current CLD policy.\n' +
                '                        Below charts provide the overall performance comparison of CLD model with\n' +
                '                        other benchmarks. (‘Current’ here refers to the current XGBoost model)'
        },
    ]
}

export {staticData};