/* ============================================
   Projects Data Configuration
   ============================================ */

const PROJECTS_DATA = {
    'MoFA House': {
        name: 'MoFA House',
        folder: 'MoFA House',
        category: 'government',
        description: 'Complete construction and renovation project for Ministry of Foreign Affairs',
        images: [] // Will be populated with actual image paths
    },
    'PCSIR': {
        name: 'PCSIR Office',
        folder: 'PCSIR',
        category: 'institutional',
        description: 'Institutional building construction for Pakistan Council of Scientific and Industrial Research',
        images: []
    },
    'PCSIR Chairmen Office': {
        name: 'PCSIR Chairmen Office',
        folder: 'PCSIR Chairmen Office',
        category: 'institutional',
        description: 'Executive office construction and renovation project',
        images: []
    },
    'Bank Al Falah': {
        name: 'Bank Al Falah',
        folder: 'Bank Al Falah',
        category: 'commercial',
        description: 'Commercial building renovation and modernization',
        images: []
    },
    'MINISter Enclave': {
        name: 'Minister Enclave',
        folder: 'MINISter Enclave',
        category: 'government',
        description: 'Government residential complex construction',
        images: []
    },
    'AIOU Construction Page': {
        name: 'AIOU Construction',
        folder: 'AIOU Construction Page',
        category: 'institutional',
        description: 'Allama Iqbal Open University construction projects',
        images: []
    },
    'DHA - II': {
        name: 'DHA - II',
        folder: 'DHA - II',
        category: 'government',
        description: 'Defence Housing Authority infrastructure development',
        images: []
    },
    'NIC': {
        name: 'NIC',
        folder: 'NIC',
        category: 'institutional',
        description: 'National Institute of Construction building project',
        images: []
    },
    'PTV': {
        name: 'PTV Data Center',
        folder: 'PTV',
        category: 'institutional',
        description: 'Pakistan Television data center construction',
        images: []
    },
    'CABI Mardan': {
        name: 'CABI Mardan',
        folder: 'CABI Mardan',
        category: 'institutional',
        description: 'Construction project in Mardan',
        images: []
    },
    'Girls Guide Association': {
        name: 'Girls Guide Association',
        folder: 'Girls Guide Association',
        category: 'institutional',
        description: 'Facility construction for Girls Guide Association',
        images: []
    },
    'NCP': {
        name: 'NCP',
        folder: 'NCP',
        category: 'government',
        description: 'National Construction Project infrastructure work',
        images: []
    },
    'PCST': {
        name: 'PCST',
        folder: 'PCST',
        category: 'institutional',
        description: 'Pakistan Council of Science and Technology project',
        images: []
    }
};

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.PROJECTS_DATA = PROJECTS_DATA;
}
