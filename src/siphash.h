#ifndef _BCN_SIPHASH_H
#define _BCN_SIPHASH_H

#include <stdint.h>
#include <stdlib.h>

uint64_t
bcn_siphash(const uint8_t *data, size_t len, const uint8_t *key);

uint64_t
bcn_siphash256(const uint8_t *data, size_t len, const uint8_t *key);

uint32_t
bcn_siphash32(const uint32_t num, const uint8_t *key);

uint64_t
bcn_siphash64(const uint64_t num, const uint8_t *key);

#endif
