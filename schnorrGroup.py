    
def checkPrime(num):
    if num == 2:
        return True
    for val in range(2, num):
        if num%val == 0:
            return False
    return True

p = 195931
q = 311
r = int((p-1)/q)
h = 2
g = pow(h, r, p)


# for i in range(2, p-1):
#     if ((p-1)%i == 0) and checkPrime(i):
#         print(i, (p-1)/i)

# i = 1
# while(True):
#     te = pow(g, i, p)
#     if te == 1:
#         break
#     print(te)
#     i+=1

# Checking for correctness of schnorr group
assert(checkPrime(p))
assert(checkPrime(q))
assert(p-1 == q*r)
    
assert(g != 1)
assert(pow(g, q, p) == 1)

print("Generator is ", g)

# Private key of contractor
xB = 20
yB = pow(g, xB, p)
print('Public key is ', yB)