from sympy import isprime
    
p = 195931
q = 311
r = int((p-1)/q)
h = 2
g = pow(h, r, p)


# Private key of contractor
skC = 20
pkC = pow(g, skC, p)
print(pkC)