/*
 * Test several conditions that should always cause us to throw.
 */
var mod_assert = require('assert');
var mod_ctype = require('../../ctype.js');

var cases = [
{ json: { }, msg: 'Invalid CTF JSON: missing metadata section' },
{ json: { metadata: {} }, msg: 'Invalid CTF JSON: missing ctf2json_version' },
{ json: { metadata: { 'ctf2json_version': [] } },
    msg: 'Unsuported ctf2json_version: ' },
{ json: { metadata: { 'ctf2json_version': 2 } },
    msg: 'Unsuported ctf2json_version: 2' },
{ json: { metadata: { 'ctf2json_version': '100.20' } },
    msg: 'Unsuported ctf2json_version: 100.20' },
{ json: { metadata: { 'ctf2json_version': '1.0' } },
    msg: 'Invalid CTF JSON: missing data section' },
{ json: { metadata: { 'ctf2json_version': '1.0' }, data: 1 },
    msg: 'Malformed CTF JSON: data section is not an array' },
{ json: { metadata: { 'ctf2json_version': '1.0' }, data: 1.1 },
    msg: 'Malformed CTF JSON: data section is not an array' },
{ json: { metadata: { 'ctf2json_version': '1.0' }, data: '1.1' },
    msg: 'Malformed CTF JSON: data section is not an array' },
{ json: { metadata: { 'ctf2json_version': '1.0' }, data: {} },
    msg: 'Malformed CTF JSON: data section is not an array' },
{ json: { metadata: { 'ctf2json_version': '1.0' },
    data: [ {
		'name': 'struct DataHolder', 'struct': [
            { 'name': 'unknown', 'type': 'missing_t' }
        ] } ]
    },
    msg: 'type not found or typdefed: missing_t' }
];

function test()
{
	var conf = { endian: 'little' };
	var ii;

	for (ii = 0; ii < cases.length; ii++) {
		try {
			mod_ctype.parseCTF(cases[ii].json, conf);
			mod_assert.fail('expected test to fail: ' + cases[ii].json);
		} catch (ex) {
			mod_assert.equal(ex.message, cases[ii].msg);
		}
	}
}

test();
