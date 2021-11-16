from sympy import isprime
    


p = 115792089237316195423570985008687907852837564279074904382605163141518161494337
q = 341948486974166000522343609283189
r = 338624364920977752681389262317185522840540224
h = 3141592653589793238462643383279502884197

# Checking for correctness of schnorr group
assert(isprime(p))
assert(isprime(q))
assert(p-1 == q*r)
    
g = pow(h, r, p)
assert(g != 1)
assert(pow(g, q, p) == 1)

# Private key of contractor
xB = 20
yB = pow(h, xB, p)
print(yB)