// http://localhost:8800
// 47.97.192.100:83
// /shujupan/qd/longenef
const baseURL = 'http://47.97.192.100:83'
const xdlURL  = baseURL + '/xdl';
const dzxURL  = baseURL + '/dzx';
const rURL    = baseURL + '/r';

const cancers = [
    'ACC',
    'BLCA',
    'BRCA',
    'CESC',
    'CHOL',
    'COAD',
    'DLBC',
    'ESCA',
    'GBM',
    'HNSC',
    'KICH',
    'KIRC',
    'KIRP',
    'LAML',
    'LGG',
    'LIHC',
    'LUAD',
    'LUSC',
    'PAAD',
    'PCPG',
    'PRAD',
    'READ',
    'SARC',
    'SKCM',
    'STAD',
    'TGCT',
    'THCA',
    'THYM',
    'UCEC',
    'UCS'
  ]

export default {
  dzxURL,
  xdlURL,
  rURL,
  cancers,
}

