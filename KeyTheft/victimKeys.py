from sympy import isprime
    
p = 195931
q = 311
r = int((p-1)/q)
h = 2
g = pow(h, r, p)


# Private key of contractor
skV = 200
pkV = pow(g, skV, p)
print(pkV)