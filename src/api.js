const reqURL  = 'http://124.223.81.224:8868';
const baseURL = 'http://localhost:8800'
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
  reqURL,
  dzxURL,
  xdlURL,
  rURL,
  cancers,
}

