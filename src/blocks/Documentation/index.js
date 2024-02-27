import { registerBlockType } from '@wordpress/blocks';
import { __ } from  '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';

import attributes from './attributes';

registerBlockType( 'wedocs/grid-docs', {
    attributes,
    save        : Save,
    edit        : Edit,
    title       : __( 'weDocs - Grid View', 'wedocs' ),
    keywords    : [ 'Doc', 'Docs', 'Documentation', 'Grid', 'Section', 'Article', 'List' ],
    category    : 'widgets',
    description : __( 'Documentation preview for weDocs users', 'wedocs' ),
    icon        : <svg viewBox='0 0 512 512'>
        <text x='729.64' y='231.36'>
            <tspan x='729.64' y='231.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='378.91' y='579.26' />
        <text x='1310.91' y='151.36'>
            <tspan x='1310.91' y='151.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='523.76' y='258.22' />
        <text x='239.33' y='-29.9'>
            <tspan x='239.33' y='-29.9' />
        </text>
        <text transform='scale(4.0128 .2492)' x='256.72' y='-469.13' />
        <text x='1337.38' y='-246.37'>
            <tspan x='1337.38' y='-246.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='530.36' y='-1337.8' />
        <text x='1918.65' y='-326.37'>
            <tspan x='1918.65' y='-326.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='675.21' y='-1658.83' />
        <text x='1529.53' y='-798.77'>
            <tspan x='1529.53' y='-798.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.24' y='-3554.48' />
        <text x='2110.79' y='-878.78'>
            <tspan x='2110.79' y='-878.78' />
        </text>
        <text transform='scale(4.0128 .2492)' x='723.09' y='-3875.52' />
        <text x='277.99' y='535.94'>
            <tspan x='277.99' y='535.94' />
        </text>
        <text x='729.64' y='231.36'>
            <tspan x='729.64' y='231.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='378.91' y='579.26' />
        <text x='1310.91' y='151.36'>
            <tspan x='1310.91' y='151.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='523.76' y='258.22' />
        <text x='239.33' y='-29.9'>
            <tspan x='239.33' y='-29.9' />
        </text>
        <text transform='scale(4.0128 .2492)' x='256.72' y='-469.13' />
        <text x='1337.38' y='-246.37'>
            <tspan x='1337.38' y='-246.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='530.36' y='-1337.8' />
        <text x='1918.65' y='-326.37'>
            <tspan x='1918.65' y='-326.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='675.21' y='-1658.83' />
        <text x='1529.53' y='-798.77'>
            <tspan x='1529.53' y='-798.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.24' y='-3554.48' />
        <text x='2110.79' y='-878.78'>
            <tspan x='2110.79' y='-878.78' />
        </text>
        <text transform='scale(4.0128 .2492)' x='723.09' y='-3875.52' />
        <text x='277.99' y='535.94'>
            <tspan x='277.99' y='535.94' />
        </text>
        <text x='729.64' y='231.36'>
            <tspan x='729.64' y='231.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='378.91' y='579.26' />
        <text x='1310.91' y='151.36'>
            <tspan x='1310.91' y='151.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='523.76' y='258.22' />
        <text x='239.33' y='-29.9'>
            <tspan x='239.33' y='-29.9' />
        </text>
        <text transform='scale(4.0128 .2492)' x='256.72' y='-469.13' />
        <text x='1337.38' y='-246.37'>
            <tspan x='1337.38' y='-246.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='530.36' y='-1337.8' />
        <text x='1918.65' y='-326.37'>
            <tspan x='1918.65' y='-326.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='675.21' y='-1658.83' />
        <text x='1529.53' y='-798.77'>
            <tspan x='1529.53' y='-798.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.24' y='-3554.48' />
        <text x='2110.79' y='-878.78'>
            <tspan x='2110.79' y='-878.78' />
        </text>
        <text transform='scale(4.0128 .2492)' x='723.09' y='-3875.52' />
        <text x='277.99' y='535.94'>
            <tspan x='277.99' y='535.94' />
        </text>
        <text x='729.64' y='231.36'>
            <tspan x='729.64' y='231.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='378.91' y='579.26' />
        <text x='1310.91' y='151.36'>
            <tspan x='1310.91' y='151.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='523.76' y='258.22' />
        <text x='239.33' y='-29.9'>
            <tspan x='239.33' y='-29.9' />
        </text>
        <text transform='scale(4.0128 .2492)' x='256.72' y='-469.13' />
        <text x='1337.38' y='-246.37'>
            <tspan x='1337.38' y='-246.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='530.36' y='-1337.8' />
        <text x='1918.65' y='-326.37'>
            <tspan x='1918.65' y='-326.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='675.21' y='-1658.83' />
        <text x='1529.53' y='-798.77'>
            <tspan x='1529.53' y='-798.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.24' y='-3554.48' />
        <text x='2110.79' y='-878.78'>
            <tspan x='2110.79' y='-878.78' />
        </text>
        <text transform='scale(4.0128 .2492)' x='723.09' y='-3875.52' />
        <text x='277.99' y='535.94'>
            <tspan x='277.99' y='535.94' />
        </text>
        <text x='2136.56' y='488.89'>
            <tspan x='2136.56' y='488.89' />
        </text>
        <text transform='scale(4.0128 .2492)' x='729.52' y='1612.7' />
        <text x='2717.83' y='408.89'>
            <tspan x='2717.83' y='408.89' />
        </text>
        <text transform='scale(4.0128 .2492)' x='874.36' y='1291.66' />
        <text x='1646.25' y='227.63'>
            <tspan x='1646.25' y='227.63' />
        </text>
        <text transform='scale(4.0128 .2492)' x='607.33' y='564.31' />
        <text x='2744.3' y='11.164'>
            <tspan x='2744.3' y='11.164' />
        </text>
        <text transform='scale(4.0128 .2492)' x='880.96' y='-304.36' />
        <text x='3325.57' y='-68.836'>
            <tspan x='3325.57' y='-68.836' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1025.81' y='-625.39' />
        <text x='2936.45' y='-541.24'>
            <tspan x='2936.45' y='-541.24' />
        </text>
        <text transform='scale(4.0128 .2492)' x='928.84' y='-2521.04' />
        <text x='3517.71' y='-621.25'>
            <tspan x='3517.71' y='-621.25' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1073.69' y='-2842.08' />
        <text x='1684.91' y='793.47'>
            <tspan x='1684.91' y='793.47' />
        </text>
        <text x='2986.55' y='540.16'>
            <tspan x='2986.55' y='540.16' />
        </text>
        <text transform='scale(4.0128 .2492)' x='941.33' y='1818.4' />
        <text x='3567.82' y='460.16'>
            <tspan x='3567.82' y='460.16' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1086.18' y='1497.36' />
        <text x='2496.25' y='278.9'>
            <tspan x='2496.25' y='278.9' />
        </text>
        <text transform='scale(4.0128 .2492)' x='819.14' y='770.02' />
        <text x='3594.29' y='62.43'>
            <tspan x='3594.29' y='62.43' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1092.78' y='-98.65' />
        <text x='4175.56' y='-17.584'>
            <tspan x='4175.56' y='-17.584' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1237.63' y='-419.68' />
        <text x='3786.45' y='-489.98'>
            <tspan x='3786.45' y='-489.98' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1140.66' y='-2315.32' />
        <text x='4367.72' y='-569.98'>
            <tspan x='4367.72' y='-569.98' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1285.51' y='-2636.36' />
        <text x='2534.91' y='844.74'>
            <tspan x='2534.91' y='844.74' />
        </text>
        <text x='6090.69' y='-202.72'>
            <tspan x='6090.69' y='-202.72' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1714.87' y='-1162.61' />
        <text x='6671.96' y='-282.72'>
            <tspan x='6671.96' y='-282.72' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1859.72' y='-1483.63' />
        <text x='5600.38' y='-463.97'>
            <tspan x='5600.38' y='-463.97' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1592.68' y='-2210.99' />
        <text x='6698.44' y='-680.45'>
            <tspan x='6698.44' y='-680.45' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1866.32' y='-3079.65' />
        <text x='7279.71' y='-760.45'>
            <tspan x='7279.71' y='-760.45' />
        </text>
        <text transform='scale(4.0128 .2492)' x='2011.17' y='-3400.67' />
        <text x='6890.59' y='-1232.85'>
            <tspan x='6890.59' y='-1232.85' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1914.2' y='-5296.33' />
        <text x='7471.85' y='-1312.85'>
            <tspan x='7471.85' y='-1312.85' />
        </text>
        <text transform='scale(4.0128 .2492)' x='2059.05' y='-5617.35' />
        <text x='5639.04' y='101.86'>
            <tspan x='5639.04' y='101.86' />
        </text>
        <text x='2347.03' y='447.08'>
            <tspan x='2347.03' y='447.08' />
        </text>
        <text transform='scale(4.0128 .2492)' x='781.96' y='1444.88' />
        <text x='2928.3' y='367.08'>
            <tspan x='2928.3' y='367.08' />
        </text>
        <text transform='scale(4.0128 .2492)' x='926.81' y='1123.86' />
        <text x='1856.72' y='185.82'>
            <tspan x='1856.72' y='185.82' />
        </text>
        <text transform='scale(4.0128 .2492)' x='659.78' y='396.51' />
        <text x='2954.77' y='-30.654'>
            <tspan x='2954.77' y='-30.654' />
        </text>
        <text transform='scale(4.0128 .2492)' x='933.41' y='-472.16' />
        <text x='3536.04' y='-110.66'>
            <tspan x='3536.04' y='-110.66' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1078.26' y='-793.19' />
        <text x='3146.93' y='-583.06'>
            <tspan x='3146.93' y='-583.06' />
        </text>
        <text transform='scale(4.0128 .2492)' x='981.29' y='-2688.84' />
        <text x='3728.19' y='-663.06'>
            <tspan x='3728.19' y='-663.06' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1126.14' y='-3009.85' />
        <text x='1895.38' y='751.66'>
            <tspan x='1895.38' y='751.66' />
        </text>
        <text x='-328.45' y='732.7'>
            <tspan x='-328.45' y='732.7' />
        </text>
        <text transform='scale(4.0128 .2492)' x='235.88' y='2377.29' />
        <text x='377.89' y='577.07'>
            <tspan x='377.89' y='577.07' />
        </text>
        <text transform='scale(4.0128 .2492)' x='411.9' y='1752.76' />
        <text x='411.27' y='568.95'>
            <tspan x='411.27' y='568.95' />
        </text>
        <text transform='scale(4.0128 .2492)' x='420.22' y='1720.16' />
        <text x='1561.69' y='414.54'>
            <tspan x='1561.69' y='414.54' />
        </text>
        <text transform='scale(4.0128 .2492)' x='586.26' y='1314.3' />
        <text x='2142.95' y='334.54'>
            <tspan x='2142.95' y='334.54' />
        </text>
        <text transform='scale(4.0128 .2492)' x='731.11' y='993.27' />
        <text x='1071.37' y='153.28'>
            <tspan x='1071.37' y='153.28' />
        </text>
        <text transform='scale(4.0128 .2492)' x='464.07' y='265.94' />
        <text x='2169.41' y='-63.19'>
            <tspan x='2169.41' y='-63.19' />
        </text>
        <text transform='scale(4.0128 .2492)' x='737.71' y='-602.74' />
        <text x='2750.69' y='-143.19'>
            <tspan x='2750.69' y='-143.19' />
        </text>
        <text transform='scale(4.0128 .2492)' x='882.54' y='-923.76' />
        <text x='2361.56' y='-615.59'>
            <tspan x='2361.56' y='-615.59' />
        </text>
        <text transform='scale(4.0128 .2492)' x='785.58' y='-2819.39' />
        <text x='2942.82' y='-695.6'>
            <tspan x='2942.82' y='-695.6' />
        </text>
        <text transform='scale(4.0128 .2492)' x='930.42' y='-3140.42' />
        <text x='1110.03' y='719.12'>
            <tspan x='1110.03' y='719.12' />
        </text>
        <text x='1511.23' y='-324.47'>
            <tspan x='1511.23' y='-324.47' />
        </text>
        <text transform='scale(4.0128 .2492)' x='573.69' y='-1651.18' />
        <text x='2092.5' y='-404.47'>
            <tspan x='2092.5' y='-404.47' />
        </text>
        <text transform='scale(4.0128 .2492)' x='718.54' y='-1972.21' />
        <text x='1020.92' y='-585.73'>
            <tspan x='1020.92' y='-585.73' />
        </text>
        <text transform='scale(4.0128 .2492)' x='451.5' y='-2699.57' />
        <text x='2118.98' y='-802.2'>
            <tspan x='2118.98' y='-802.2' />
        </text>
        <text transform='scale(4.0128 .2492)' x='725.14' y='-3568.21' />
        <text x='2700.24' y='-882.21'>
            <tspan x='2700.24' y='-882.21' />
        </text>
        <text transform='scale(4.0128 .2492)' x='869.97' y='-3889.25' />
        <text x='2311.11' y='-1354.61'>
            <tspan x='2311.11' y='-1354.61' />
        </text>
        <text transform='scale(4.0128 .2492)' x='773.02' y='-5784.88' />
        <text x='2892.39' y='-1434.61'>
            <tspan x='2892.39' y='-1434.61' />
        </text>
        <text transform='scale(4.0128 .2492)' x='917.85' y='-6105.91' />
        <text x='1059.58' y='-19.894'>
            <tspan x='1059.58' y='-19.894' />
        </text>
        <text x='4615.38' y='-1067.35'>
            <tspan x='4615.38' y='-1067.35' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1347.22' y='-4632.17' />
        <text x='5196.64' y='-1147.35'>
            <tspan x='5196.64' y='-1147.35' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1492.07' y='-4953.21' />
        <text x='4125.06' y='-1328.6'>
            <tspan x='4125.06' y='-1328.6' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1225.03' y='-5680.54' />
        <text x='5223.1' y='-1545.08'>
            <tspan x='5223.1' y='-1545.08' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1498.67' y='-6549.2' />
        <text x='5804.38' y='-1625.08'>
            <tspan x='5804.38' y='-1625.08' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1643.52' y='-6870.24' />
        <text x='5415.26' y='-2097.48'>
            <tspan x='5415.26' y='-2097.48' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1546.55' y='-8765.87' />
        <text x='5996.52' y='-2177.48'>
            <tspan x='5996.52' y='-2177.48' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1691.4' y='-9086.89' />
        <text x='4163.72' y='-762.77'>
            <tspan x='4163.72' y='-762.77' />
        </text>
        <text x='-378.9' y='-8.694'>
            <tspan x='-378.9' y='-8.694' />
        </text>
        <text transform='scale(4.0128 .2492)' x='223.31' y='-597.77' />
        <text x='-378.9' y='-8.694'>
            <tspan x='-378.9' y='-8.694' />
        </text>
        <text transform='scale(4.0128 .2492)' x='223.31' y='-597.77' />
        <text x='-712.45' y='624.22'>
            <tspan x='-712.45' y='624.22' />
        </text>
        <text transform='scale(4.0128 .2492)' x='140.19' y='1941.99' />
        <text x='-6.105' y='468.59'>
            <tspan x='-6.105' y='468.59' />
        </text>
        <text transform='scale(4.0128 .2492)' x='316.21' y='1317.47' />
        <text x='2986.55' y='540.18'>
            <tspan x='2986.55' y='540.18' />
        </text>
        <text transform='scale(4.0128 .2492)' x='941.33' y='1818.48' />
        <text x='3567.82' y='460.18'>
            <tspan x='3567.82' y='460.18' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1086.18' y='1497.44' />
        <text x='2496.25' y='278.92'>
            <tspan x='2496.25' y='278.92' />
        </text>
        <text transform='scale(4.0128 .2492)' x='819.14' y='770.1' />
        <text x='3594.29' y='62.45'>
            <tspan x='3594.29' y='62.45' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1092.78' y='-98.58' />
        <text x='4175.56' y='-17.564'>
            <tspan x='4175.56' y='-17.564' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1237.63' y='-419.61' />
        <text x='3786.45' y='-489.96'>
            <tspan x='3786.45' y='-489.96' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1140.66' y='-2315.26' />
        <text x='4367.72' y='-569.96'>
            <tspan x='4367.72' y='-569.96' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1285.51' y='-2636.3' />
        <text x='2534.91' y='844.76'>
            <tspan x='2534.91' y='844.76' />
        </text>
        <text x='6090.69' y='-202.7'>
            <tspan x='6090.69' y='-202.7' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1714.88' y='-1162.54' />
        <text x='6671.96' y='-282.7'>
            <tspan x='6671.96' y='-282.7' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1859.73' y='-1483.57' />
        <text x='5600.38' y='-463.95'>
            <tspan x='5600.38' y='-463.95' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1592.69' y='-2210.93' />
        <text x='6698.44' y='-680.43'>
            <tspan x='6698.44' y='-680.43' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1866.33' y='-3079.59' />
        <text x='7279.71' y='-760.43'>
            <tspan x='7279.71' y='-760.43' />
        </text>
        <text transform='scale(4.0128 .2492)' x='2011.18' y='-3400.62' />
        <text x='6890.59' y='-1232.83'>
            <tspan x='6890.59' y='-1232.83' />
        </text>
        <text transform='scale(4.0128 .2492)' x='1914.21' y='-5296.28' />
        <text x='7471.85' y='-1312.83'>
            <tspan x='7471.85' y='-1312.83' />
        </text>
        <text transform='scale(4.0128 .2492)' x='2059.06' y='-5617.31' />
        <text x='5639.04' y='101.88'>
            <tspan x='5639.04' y='101.88' />
        </text>
        <text x='1452.37' y='309.41'>
            <tspan x='1452.37' y='309.41' />
        </text>
        <text transform='scale(4.0128 .2492)' x='559.01' y='892.44' />
        <text x='2033.64' y='229.41'>
            <tspan x='2033.64' y='229.41' />
        </text>
        <text transform='scale(4.0128 .2492)' x='703.86' y='571.41' />
        <text x='962.06' y='48.15'>
            <tspan x='962.06' y='48.15' />
        </text>
        <text transform='scale(4.0128 .2492)' x='436.82' y='-155.94' />
        <text x='2060.11' y='-168.32'>
            <tspan x='2060.11' y='-168.32' />
        </text>
        <text transform='scale(4.0128 .2492)' x='710.46' y='-1024.61' />
        <text x='2641.38' y='-248.33'>
            <tspan x='2641.38' y='-248.33' />
        </text>
        <text transform='scale(4.0128 .2492)' x='855.31' y='-1345.65' />
        <text x='2252.26' y='-720.73'>
            <tspan x='2252.26' y='-720.73' />
        </text>
        <text transform='scale(4.0128 .2492)' x='758.34' y='-3241.3' />
        <text x='2833.52' y='-800.73'>
            <tspan x='2833.52' y='-800.73' />
        </text>
        <text transform='scale(4.0128 .2492)' x='903.19' y='-3562.32' />
        <text x='1000.72' y='613.99'>
            <tspan x='1000.72' y='613.99' />
        </text>
        <text x='1390.8' y='467.83'>
            <tspan x='1390.8' y='467.83' />
        </text>
        <text transform='scale(4.0128 .2492)' x='543.67' y='1528.18' />
        <text x='1972.07' y='387.83'>
            <tspan x='1972.07' y='387.83' />
        </text>
        <text transform='scale(4.0128 .2492)' x='688.52' y='1207.15' />
        <text x='900.49' y='206.57'>
            <tspan x='900.49' y='206.57' />
        </text>
        <text transform='scale(4.0128 .2492)' x='421.48' y='479.79' />
        <text x='1998.54' y='-9.895'>
            <tspan x='1998.54' y='-9.895' />
        </text>
        <text transform='scale(4.0128 .2492)' x='695.12' y='-388.87' />
        <text x='2579.81' y='-89.91'>
            <tspan x='2579.81' y='-89.91' />
        </text>
        <text transform='scale(4.0128 .2492)' x='839.97' y='-709.91' />
        <text x='2190.69' y='-562.31'>
            <tspan x='2190.69' y='-562.31' />
        </text>
        <text transform='scale(4.0128 .2492)' x='743' y='-2605.56' />
        <text x='2771.95' y='-642.31'>
            <tspan x='2771.95' y='-642.31' />
        </text>
        <text transform='scale(4.0128 .2492)' x='887.85' y='-2926.59' />
        <text x='939.15' y='772.41'>
            <tspan x='939.15' y='772.41' />
        </text>
        <text x='353.98' y='225.13'>
            <tspan x='353.98' y='225.13' />
        </text>
        <text transform='scale(4.0128 .2492)' x='393.23' y='363.05' />
        <text x='1099.36' y='278.28'>
            <tspan x='1099.36' y='278.28' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.98' y='576.3' />
        <text x='1998.97' y='154.45'>
            <tspan x='1998.97' y='154.45' />
        </text>
        <text transform='scale(4.0128 .2492)' x='803.16' y='79.44' />
        <text x='1126.82' y='101.82'>
            <tspan x='1126.82' y='101.82' />
        </text>
        <text transform='scale(4.0128 .2492)' x='585.82' y='-131.77' />
        <text x='2026.43' y='-21.995'>
            <tspan x='2026.43' y='-21.995' />
        </text>
        <text transform='scale(4.0128 .2492)' x='810' y='-628.63' />
        <text x='-1883.16' y='553.7'>
            <tspan x='-1883.16' y='553.7' />
        </text>
        <text transform='scale(4.0128 .2492)' x='-164.27' y='1681.55' />
        <text x='45.12' y='318.27'>
            <tspan x='45.12' y='318.27' />
        </text>
        <text transform='scale(4.0128 .2492)' x='316.26' y='736.81' />
        <text x='790.5' y='371.41'>
            <tspan x='790.5' y='371.41' />
        </text>
        <text transform='scale(4.0128 .2492)' x='502.01' y='950.07' />
        <text x='1690.11' y='247.6'>
            <tspan x='1690.11' y='247.6' />
        </text>
        <text transform='scale(4.0128 .2492)' x='726.19' y='453.21' />
        <text x='817.96' y='194.96'>
            <tspan x='817.96' y='194.96' />
        </text>
        <text transform='scale(4.0128 .2492)' x='508.85' y='241.98' />
        <text x='1717.58' y='71.14'>
            <tspan x='1717.58' y='71.14' />
        </text>
        <text transform='scale(4.0128 .2492)' x='733.04' y='-254.87' />
        <text x='-2192.02' y='646.84'>
            <tspan x='-2192.02' y='646.84' />
        </text>
        <text transform='scale(4.0128 .2492)' x='-241.24' y='2055.31' />
        <text x='-669.45' y='201.41'>
            <tspan x='-669.45' y='201.41' />
        </text>
        <text transform='scale(4.0128 .2492)' x='138.19' y='267.89' />
        <text x='75.928' y='254.56'>
            <tspan x='75.928' y='254.56' />
        </text>
        <text transform='scale(4.0128 .2492)' x='323.94' y='481.14' />
        <text x='975.54' y='130.74'>
            <tspan x='975.54' y='130.74' />
        </text>
        <text transform='scale(4.0128 .2492)' x='548.12' y='-15.715' />
        <text x='103.39' y='78.1'>
            <tspan x='103.39' y='78.1' />
        </text>
        <text transform='scale(4.0128 .2492)' x='330.78' y='-226.94' />
        <text x='1003.01' y='-45.705'>
            <tspan x='1003.01' y='-45.705' />
        </text>
        <text transform='scale(4.0128 .2492)' x='554.96' y='-723.79' />
        <text x='-2906.59' y='529.99'>
            <tspan x='-2906.59' y='529.99' />
        </text>
        <text transform='scale(4.0128 .2492)' x='-419.31' y='1586.39' />
        <text x='1390.8' y='467.83'>
            <tspan x='1390.8' y='467.83' />
        </text>
        <text transform='scale(4.0128 .2492)' x='543.67' y='1528.18' />
        <text x='1972.07' y='387.83'>
            <tspan x='1972.07' y='387.83' />
        </text>
        <text transform='scale(4.0128 .2492)' x='688.52' y='1207.15' />
        <text x='900.49' y='206.57'>
            <tspan x='900.49' y='206.57' />
        </text>
        <text transform='scale(4.0128 .2492)' x='421.48' y='479.79' />
        <text x='1998.54' y='-9.895'>
            <tspan x='1998.54' y='-9.895' />
        </text>
        <text transform='scale(4.0128 .2492)' x='695.12' y='-388.86' />
        <text x='2579.81' y='-89.91'>
            <tspan x='2579.81' y='-89.91' />
        </text>
        <text transform='scale(4.0128 .2492)' x='839.97' y='-709.9' />
        <text x='2190.69' y='-562.31'>
            <tspan x='2190.69' y='-562.31' />
        </text>
        <text transform='scale(4.0128 .2492)' x='743' y='-2605.54' />
        <text x='2771.95' y='-642.31'>
            <tspan x='2771.95' y='-642.31' />
        </text>
        <text transform='scale(4.0128 .2492)' x='887.85' y='-2926.57' />
        <text x='939.15' y='772.41'>
            <tspan x='939.15' y='772.41' />
        </text>
        <text x='766.12' y='463.59'>
            <tspan x='766.12' y='463.59' />
        </text>
        <text transform='scale(4.0128 .2492)' x='388' y='1511.16' />
        <text x='1347.39' y='383.58'>
            <tspan x='1347.39' y='383.58' />
        </text>
        <text transform='scale(4.0128 .2492)' x='532.85' y='1190.12' />
        <text x='275.81' y='202.33'>
            <tspan x='275.81' y='202.33' />
        </text>
        <text transform='scale(4.0128 .2492)' x='265.81' y='462.77' />
        <text x='1373.86' y='-14.15'>
            <tspan x='1373.86' y='-14.15' />
        </text>
        <text transform='scale(4.0128 .2492)' x='539.45' y='-405.9' />
        <text x='1955.13' y='-94.15'>
            <tspan x='1955.13' y='-94.15' />
        </text>
        <text transform='scale(4.0128 .2492)' x='684.3' y='-726.93' />
        <text x='1566.01' y='-566.55'>
            <tspan x='1566.01' y='-566.55' />
        </text>
        <text transform='scale(4.0128 .2492)' x='587.33' y='-2622.58' />
        <text x='2147.28' y='-646.55'>
            <tspan x='2147.28' y='-646.55' />
        </text>
        <text transform='scale(4.0128 .2492)' x='732.18' y='-2943.62' />
        <text x='314.47' y='768.16'>
            <tspan x='314.47' y='768.16' />
        </text>
        <text x='-270.7' y='220.89'>
            <tspan x='-270.7' y='220.89' />
        </text>
        <text transform='scale(4.0128 .2492)' x='237.56' y='346.02' />
        <text x='474.68' y='274.03'>
            <tspan x='474.68' y='274.03' />
        </text>
        <text transform='scale(4.0128 .2492)' x='423.31' y='559.27' />
        <text x='1374.29' y='150.21'>
            <tspan x='1374.29' y='150.21' />
        </text>
        <text transform='scale(4.0128 .2492)' x='647.49' y='62.42' />
        <text x='502.14' y='97.57'>
            <tspan x='502.14' y='97.57' />
        </text>
        <text transform='scale(4.0128 .2492)' x='430.15' y='-148.8' />
        <text x='1401.76' y='-26.24'>
            <tspan x='1401.76' y='-26.24' />
        </text>
        <text transform='scale(4.0128 .2492)' x='654.33' y='-645.66' />
        <text x='-2507.84' y='549.46'>
            <tspan x='-2507.84' y='549.46' />
        </text>
        <text transform='scale(4.0128 .2492)' x='-319.94' y='1664.52' />
        <text x='-579.56' y='314.03'>
            <tspan x='-579.56' y='314.03' />
        </text>
        <text transform='scale(4.0128 .2492)' x='160.59' y='719.79' />
        <text x='165.82' y='367.17'>
            <tspan x='165.82' y='367.17' />
        </text>
        <text transform='scale(4.0128 .2492)' x='346.34' y='933.04' />
        <text x='1065.43' y='243.36'>
            <tspan x='1065.43' y='243.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='570.52' y='436.18' />
        <text x='193.28' y='190.72'>
            <tspan x='193.28' y='190.72' />
        </text>
        <text transform='scale(4.0128 .2492)' x='353.18' y='224.96' />
        <text x='1092.9' y='66.905'>
            <tspan x='1092.9' y='66.905' />
        </text>
        <text transform='scale(4.0128 .2492)' x='577.37' y='-271.89' />
        <text x='-2816.7' y='642.6'>
            <tspan x='-2816.7' y='642.6' />
        </text>
        <text transform='scale(4.0128 .2492)' x='-396.91' y='2038.28' />
        <text x='-1294.13' y='197.17'>
            <tspan x='-1294.13' y='197.17' />
        </text>
        <text transform='scale(4.0128 .2492)' x='-17.478' y='250.86' />
        <text x='-548.75' y='250.32'>
            <tspan x='-548.75' y='250.32' />
        </text>
        <text transform='scale(4.0128 .2492)' x='168.27' y='464.11' />
        <text x='350.86' y='126.5'>
            <tspan x='350.86' y='126.5' />
        </text>
        <text transform='scale(4.0128 .2492)' x='392.45' y='-32.745' />
        <text x='-521.29' y='73.865'>
            <tspan x='-521.29' y='73.865' />
        </text>
        <text transform='scale(4.0128 .2492)' x='175.11' y='-243.96' />
        <text x='378.33' y='-49.955'>
            <tspan x='378.33' y='-49.955' />
        </text>
        <text transform='scale(4.0128 .2492)' x='399.3' y='-740.82' />
        <text x='-3531.27' y='525.74'>
            <tspan x='-3531.27' y='525.74' />
        </text>
        <text transform='scale(4.0128 .2492)' x='-574.97' y='1569.36' />
        <text x='729.64' y='235.77'>
            <tspan x='729.64' y='235.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='378.91' y='596.97' />
        <text x='1310.91' y='155.77'>
            <tspan x='1310.91' y='155.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='523.76' y='275.93' />
        <text x='239.33' y='-25.486'>
            <tspan x='239.33' y='-25.486' />
        </text>
        <text transform='scale(4.0128 .2492)' x='256.72' y='-451.41' />
        <text x='1337.38' y='-241.96'>
            <tspan x='1337.38' y='-241.96' />
        </text>
        <text transform='scale(4.0128 .2492)' x='530.36' y='-1320.09' />
        <text x='1918.65' y='-321.96'>
            <tspan x='1918.65' y='-321.96' />
        </text>
        <text transform='scale(4.0128 .2492)' x='675.21' y='-1641.12' />
        <text x='1529.53' y='-794.36'>
            <tspan x='1529.53' y='-794.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.24' y='-3536.77' />
        <text x='2110.79' y='-874.37'>
            <tspan x='2110.79' y='-874.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='723.09' y='-3857.81' />
        <text x='277.99' y='540.35'>
            <tspan x='277.99' y='540.35' />
        </text>
        <text x='729.64' y='231.36'>
            <tspan x='729.64' y='231.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='378.91' y='579.26' />
        <text x='1310.91' y='151.36'>
            <tspan x='1310.91' y='151.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='523.76' y='258.22' />
        <text x='239.33' y='-29.9'>
            <tspan x='239.33' y='-29.9' />
        </text>
        <text transform='scale(4.0128 .2492)' x='256.72' y='-469.13' />
        <text x='1337.38' y='-246.37'>
            <tspan x='1337.38' y='-246.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='530.36' y='-1337.8' />
        <text x='1918.65' y='-326.37'>
            <tspan x='1918.65' y='-326.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='675.21' y='-1658.83' />
        <text x='1529.53' y='-798.77'>
            <tspan x='1529.53' y='-798.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.24' y='-3554.48' />
        <text x='2110.79' y='-878.78'>
            <tspan x='2110.79' y='-878.78' />
        </text>
        <text transform='scale(4.0128 .2492)' x='723.09' y='-3875.52' />
        <text x='277.99' y='535.94'>
            <tspan x='277.99' y='535.94' />
        </text>
        <text x='1722.37' y='272.59'>
            <tspan x='1722.37' y='272.59' />
        </text>
        <text transform='scale(4.0128 .2492)' x='626.3' y='744.7' />
        <text x='2303.64' y='192.59'>
            <tspan x='2303.64' y='192.59' />
        </text>
        <text transform='scale(4.0128 .2492)' x='771.15' y='423.67' />
        <text x='1232.06' y='11.33'>
            <tspan x='1232.06' y='11.33' />
        </text>
        <text transform='scale(4.0128 .2492)' x='504.11' y='-303.68' />
        <text x='2330.11' y='-205.14'>
            <tspan x='2330.11' y='-205.14' />
        </text>
        <text transform='scale(4.0128 .2492)' x='777.75' y='-1172.35' />
        <text x='2911.38' y='-285.15'>
            <tspan x='2911.38' y='-285.15' />
        </text>
        <text transform='scale(4.0128 .2492)' x='922.6' y='-1493.39' />
        <text x='2522.26' y='-757.55'>
            <tspan x='2522.26' y='-757.55' />
        </text>
        <text transform='scale(4.0128 .2492)' x='825.63' y='-3389.04' />
        <text x='3103.52' y='-837.55'>
            <tspan x='3103.52' y='-837.55' />
        </text>
        <text transform='scale(4.0128 .2492)' x='970.48' y='-3710.07' />
        <text x='1270.72' y='577.17'>
            <tspan x='1270.72' y='577.17' />
        </text>
        <text x='729.64' y='231.36'>
            <tspan x='729.64' y='231.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='378.91' y='579.26' />
        <text x='1310.91' y='151.36'>
            <tspan x='1310.91' y='151.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='523.76' y='258.22' />
        <text x='239.33' y='-29.9'>
            <tspan x='239.33' y='-29.9' />
        </text>
        <text transform='scale(4.0128 .2492)' x='256.72' y='-469.13' />
        <text x='1337.38' y='-246.37'>
            <tspan x='1337.38' y='-246.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='530.36' y='-1337.8' />
        <text x='1918.65' y='-326.37'>
            <tspan x='1918.65' y='-326.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='675.21' y='-1658.83' />
        <text x='1529.53' y='-798.77'>
            <tspan x='1529.53' y='-798.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.24' y='-3554.48' />
        <text x='2110.79' y='-878.78'>
            <tspan x='2110.79' y='-878.78' />
        </text>
        <text transform='scale(4.0128 .2492)' x='723.09' y='-3875.52' />
        <text x='277.99' y='535.94'>
            <tspan x='277.99' y='535.94' />
        </text>
        <text x='729.64' y='231.36'>
            <tspan x='729.64' y='231.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='378.91' y='579.26' />
        <text x='1310.91' y='151.36'>
            <tspan x='1310.91' y='151.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='523.76' y='258.22' />
        <text x='239.33' y='-29.9'>
            <tspan x='239.33' y='-29.9' />
        </text>
        <text transform='scale(4.0128 .2492)' x='256.72' y='-469.13' />
        <text x='1337.38' y='-246.37'>
            <tspan x='1337.38' y='-246.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='530.36' y='-1337.8' />
        <text x='1918.65' y='-326.37'>
            <tspan x='1918.65' y='-326.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='675.21' y='-1658.83' />
        <text x='1529.53' y='-798.77'>
            <tspan x='1529.53' y='-798.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.24' y='-3554.48' />
        <text x='2110.79' y='-878.78'>
            <tspan x='2110.79' y='-878.78' />
        </text>
        <text transform='scale(4.0128 .2492)' x='723.09' y='-3875.52' />
        <text x='277.99' y='535.94'>
            <tspan x='277.99' y='535.94' />
        </text>
        <text x='1781.5' y='272.72'>
            <tspan x='1781.5' y='272.72' />
        </text>
        <text transform='scale(4.0128 .2492)' x='641.03' y='745.22' />
        <text x='2362.77' y='192.72'>
            <tspan x='2362.77' y='192.72' />
        </text>
        <text transform='scale(4.0128 .2492)' x='785.88' y='424.18' />
        <text x='1291.19' y='11.457'>
            <tspan x='1291.19' y='11.457' />
        </text>
        <text transform='scale(4.0128 .2492)' x='518.84' y='-303.17' />
        <text x='2389.24' y='-205.01'>
            <tspan x='2389.24' y='-205.01' />
        </text>
        <text transform='scale(4.0128 .2492)' x='792.48' y='-1171.84' />
        <text x='2970.51' y='-285.01'>
            <tspan x='2970.51' y='-285.01' />
        </text>
        <text transform='scale(4.0128 .2492)' x='937.33' y='-1492.87' />
        <text x='2581.39' y='-757.41'>
            <tspan x='2581.39' y='-757.41' />
        </text>
        <text transform='scale(4.0128 .2492)' x='840.36' y='-3388.52' />
        <text x='3162.65' y='-837.42'>
            <tspan x='3162.65' y='-837.42' />
        </text>
        <text transform='scale(4.0128 .2492)' x='985.21' y='-3709.56' />
        <text x='1329.85' y='577.3'>
            <tspan x='1329.85' y='577.3' />
        </text>
        <text x='729.64' y='231.36'>
            <tspan x='729.64' y='231.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='378.91' y='579.26' />
        <text x='1310.91' y='151.36'>
            <tspan x='1310.91' y='151.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='523.76' y='258.22' />
        <text x='239.33' y='-29.9'>
            <tspan x='239.33' y='-29.9' />
        </text>
        <text transform='scale(4.0128 .2492)' x='256.72' y='-469.13' />
        <text x='1337.38' y='-246.37'>
            <tspan x='1337.38' y='-246.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='530.36' y='-1337.8' />
        <text x='1918.65' y='-326.37'>
            <tspan x='1918.65' y='-326.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='675.21' y='-1658.83' />
        <text x='1529.53' y='-798.77'>
            <tspan x='1529.53' y='-798.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.24' y='-3554.48' />
        <text x='2110.79' y='-878.78'>
            <tspan x='2110.79' y='-878.78' />
        </text>
        <text transform='scale(4.0128 .2492)' x='723.09' y='-3875.52' />
        <text x='277.99' y='535.94'>
            <tspan x='277.99' y='535.94' />
        </text>
        <text x='1722.37' y='272.59'>
            <tspan x='1722.37' y='272.59' />
        </text>
        <text transform='scale(4.0128 .2492)' x='626.3' y='744.7' />
        <text x='2303.64' y='192.59'>
            <tspan x='2303.64' y='192.59' />
        </text>
        <text transform='scale(4.0128 .2492)' x='771.15' y='423.67' />
        <text x='1232.06' y='11.33'>
            <tspan x='1232.06' y='11.33' />
        </text>
        <text transform='scale(4.0128 .2492)' x='504.11' y='-303.68' />
        <text x='2330.11' y='-205.14'>
            <tspan x='2330.11' y='-205.14' />
        </text>
        <text transform='scale(4.0128 .2492)' x='777.75' y='-1172.35' />
        <text x='2911.38' y='-285.15'>
            <tspan x='2911.38' y='-285.15' />
        </text>
        <text transform='scale(4.0128 .2492)' x='922.6' y='-1493.39' />
        <text x='2522.26' y='-757.55'>
            <tspan x='2522.26' y='-757.55' />
        </text>
        <text transform='scale(4.0128 .2492)' x='825.63' y='-3389.04' />
        <text x='3103.52' y='-837.55'>
            <tspan x='3103.52' y='-837.55' />
        </text>
        <text transform='scale(4.0128 .2492)' x='970.48' y='-3710.07' />
        <text x='1270.72' y='577.17'>
            <tspan x='1270.72' y='577.17' />
        </text>
        <text x='729.64' y='231.36'>
            <tspan x='729.64' y='231.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='378.91' y='579.26' />
        <text x='1310.91' y='151.36'>
            <tspan x='1310.91' y='151.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='523.76' y='258.22' />
        <text x='239.33' y='-29.9'>
            <tspan x='239.33' y='-29.9' />
        </text>
        <text transform='scale(4.0128 .2492)' x='256.72' y='-469.13' />
        <text x='1337.38' y='-246.37'>
            <tspan x='1337.38' y='-246.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='530.36' y='-1337.8' />
        <text x='1918.65' y='-326.37'>
            <tspan x='1918.65' y='-326.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='675.21' y='-1658.83' />
        <text x='1529.53' y='-798.77'>
            <tspan x='1529.53' y='-798.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.24' y='-3554.48' />
        <text x='2110.79' y='-878.78'>
            <tspan x='2110.79' y='-878.78' />
        </text>
        <text transform='scale(4.0128 .2492)' x='723.09' y='-3875.52' />
        <text x='277.99' y='535.94'>
            <tspan x='277.99' y='535.94' />
        </text>
        <g fillRule='evenodd'>
            <path
                d='m471.95 253.05c0 120.9-98.01 218.91-218.91 218.91s-218.91-98.01-218.91-218.91 98.01-218.91 218.91-218.91 218.91 98.01 218.91 218.91'
                fill='#6788cc' />
            <path
                d='m256 1c-140.83 0-255 114.17-255 255s114.17 255 255 255 255-114.17 255-255-114.17-255-255-255m8.827 44.931c120.9 0 218.9 98 218.9 218.9s-98 218.9-218.9 218.9-218.93-98-218.93-218.9 98.03-218.9 218.93-218.9'
                fillOpacity='.067' />
            <g fillOpacity='.129'>
                <path
                    d='m256 4.43c-138.94 0-251.57 112.63-251.57 251.57s112.63 251.57 251.57 251.57 251.57-112.63 251.57-251.57-112.63-251.57-251.57-251.57m5.885 38.556c120.9 0 218.9 98 218.9 218.9s-98 218.9-218.9 218.9-218.93-98-218.93-218.9 98.03-218.9 218.93-218.9' />
                <path
                    d='m256 8.36c-136.77 0-247.64 110.87-247.64 247.64s110.87 247.64 247.64 247.64 247.64-110.87 247.64-247.64-110.87-247.64-247.64-247.64m2.942 31.691c120.9 0 218.9 98 218.9 218.9s-98 218.9-218.9 218.9-218.93-98-218.93-218.9 98.03-218.9 218.93-218.9' />
            </g>
            <path
                d='m253.04 7.86c-135.42 0-245.19 109.78-245.19 245.19 0 135.42 109.78 245.19 245.19 245.19 135.42 0 245.19-109.78 245.19-245.19 0-135.42-109.78-245.19-245.19-245.19zm0 26.297c120.9 0 218.9 98 218.9 218.9s-98 218.9-218.9 218.9-218.93-98-218.93-218.9 98.03-218.9 218.93-218.9z'
                fill='#fff' stroke='#000' strokeOpacity='.31' strokeWidth='4.904' />
        </g>
        <text x='729.64' y='231.36'>
            <tspan x='729.64' y='231.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='378.91' y='579.26' />
        <text x='1310.91' y='151.36'>
            <tspan x='1310.91' y='151.36' />
        </text>
        <text transform='scale(4.0128 .2492)' x='523.76' y='258.22' />
        <text x='239.33' y='-29.9'>
            <tspan x='239.33' y='-29.9' />
        </text>
        <text transform='scale(4.0128 .2492)' x='256.72' y='-469.13' />
        <text x='1337.38' y='-246.37'>
            <tspan x='1337.38' y='-246.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='530.36' y='-1337.8' />
        <text x='1918.65' y='-326.37'>
            <tspan x='1918.65' y='-326.37' />
        </text>
        <text transform='scale(4.0128 .2492)' x='675.21' y='-1658.83' />
        <text x='1529.53' y='-798.77'>
            <tspan x='1529.53' y='-798.77' />
        </text>
        <text transform='scale(4.0128 .2492)' x='578.24' y='-3554.48' />
        <text x='2110.79' y='-878.78'>
            <tspan x='2110.79' y='-878.78' />
        </text>
        <text transform='scale(4.0128 .2492)' x='723.09' y='-3875.52' />
        <text x='277.99' y='535.94'>
            <tspan x='277.99' y='535.94' />
        </text>
        <path
            d='m165.16 122c-15.204 0-27.841 10.703-30.813 25l4.531 4.531c-.727-.183-1.495-.281-2.281-.281h-5.438c-5.108 0-9.219 4.111-9.219 9.219v34.719c0 5.108 4.111 9.219 9.219 9.219l4.25 4.25h-1.719v16.5l4.375 4.375c-.478-.076-.969-.125-1.469-.125h-5.438c-5.108 0-9.219 4.111-9.219 9.219v34.719c0 5.108 4.111 9.219 9.219 9.219l4.25 4.25h-1.719v16.5l4.375 4.375c-.478-.076-.969-.125-1.469-.125h-5.438c-5.108 0-9.219 4.111-9.219 9.219v34.719c0 5.108 4.111 9.219 9.219 9.219l4.25 4.25h-1.063c1.266 6.119 4.314 11.595 8.563 15.844l90.25 90.25c6.549.59 13.173.906 19.875.906 120.9 0 218.91-98.01 218.91-218.91 0-11.303-.848-22.409-2.5-33.25l-87.75-87.75-1.063-1.094c-5.669-5.552-13.437-8.969-22.03-8.969h-193.44m-19.625 36.19 4.531 4.531v2l-4.25-4.25c0-.786-.098-1.554-.281-2.281m.156 78.969 4.375 4.375v1.344l-4.25-4.25c0-.5-.049-.991-.125-1.469m0 78.16 4.375 4.375v1.344l-4.25-4.25c0-.5-.049-.991-.125-1.469'
            opacity='.25' />
        <g fill='#fff'>
            <path
                d='m165.16 122c-13.745 0-25.382 8.759-29.688 21 1.274.072 2.536.231 3.781.469 9.49 1.047 15.05 10.581 14.844 19.5-1.212 11.753.827 23.636-.688 35.34-1.618 9.517-10.666 14.56-19.719 14.563v8.25c1.879.013 3.736.151 5.563.5 9.484 1.041 15.05 10.581 14.844 19.5-1.212 11.753.827 23.636-.688 35.34-1.618 9.517-10.666 14.56-19.719 14.563v8.25c1.879.013 3.736.151 5.563.5 9.49 1.047 15.05 10.581 14.844 19.5-1.212 11.753.827 23.636-.688 35.34-1.51 8.881-9.49 13.84-17.906 14.469 4.324 12.205 15.938 20.906 29.656 20.906h193.44c17.428 0 31.469-14.04 31.469-31.469v-205.06c0-17.428-14.04-31.469-31.469-31.469h-193.44m20.688 49.813h152.06c9.08 0 16.375 7.327 16.375 16.406 0 9.08-7.296 16.375-16.375 16.375h-152.06c-9.08 0-16.375-7.296-16.375-16.375 0-9.08 7.296-16.406 16.375-16.406m0 67.781h152.06c9.08 0 16.375 7.327 16.375 16.406 0 9.08-7.296 16.375-16.375 16.375h-152.06c-9.08 0-16.375-7.296-16.375-16.375 0-9.08 7.296-16.406 16.375-16.406m0 67.781h152.06c9.08 0 16.375 7.296 16.375 16.375 0 9.08-7.296 16.406-16.375 16.406h-152.06c-9.08 0-16.375-7.327-16.375-16.406 0-9.08 7.296-16.375 16.375-16.375' />
            <path
                d='m131.16 151.25c-5.108 0-9.219 4.111-9.219 9.219v34.719c0 5.108 4.111 9.219 9.219 9.219h5.438c5.108 0 9.219-4.111 9.219-9.219v-34.719c0-5.108-4.111-9.219-9.219-9.219zm0 78.16c-5.108 0-9.219 4.111-9.219 9.219v34.719c0 5.108 4.111 9.219 9.219 9.219h5.438c5.108 0 9.219-4.111 9.219-9.219v-34.719c0-5.108-4.111-9.219-9.219-9.219zm0 78.16c-5.108 0-9.219 4.111-9.219 9.219v34.719c0 5.108 4.111 9.219 9.219 9.219h5.438c5.108 0 9.219-4.111 9.219-9.219v-34.719c0-5.108-4.111-9.219-9.219-9.219z' />
        </g>
    </svg>,
});
