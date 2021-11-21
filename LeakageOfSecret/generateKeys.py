import random
from web3 import Web3

noEle = 4
noSample = 1
leakageDocument = []

for i in range (0, noEle):
    val = random.randrange(0, 1000000)
    print(val)
    leakageDocument.append(val)

for i in range (0, noEle):
    leakageDocument[i] = Web3.toInt(Web3.solidityKeccak(['uint256'], [leakageDocument[i]]))

for i in range (0, noEle):
    print(leakageDocument[i])