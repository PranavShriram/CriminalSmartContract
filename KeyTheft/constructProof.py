from sympy import isprime
import hashlib
import random
import eth_abi
from web3 import Web3

p = 195931
q = 311
r = int((p-1)/q)
h = 2
g = pow(h, r, p)
yC = 130018


# Private key of victim
skV = 200
pkV = pow(g, skV, p)
print(pkV)

# Constructing proof for perpetrator knowing skV
r = random.randrange(0, q)
k = random.randrange(0, q)
w = random.randrange(0, q)

trapdoor = Web3.toInt(Web3.solidityKeccak(['uint256', 'uint256'], [pow(g, w, p)%p, pow(yC, r, p)%p]))
# trapdoor = (pow(g, w, p)%p*pow(yC, r, p)%p)%p
commit = pow(g, k, p)
challenge = (trapdoor%p + commit%p)%p
response = (k%q + (skV%q*(challenge%q + w%q)%q)%q)%q
challengeExpo = pow(pkV, challenge + w, p)
print(w, r,commit, response, challenge, trapdoor, challengeExpo)
