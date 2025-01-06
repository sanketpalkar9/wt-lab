// Take a string input write all the Permutation and Combination for Ram, Rama, Manikrao

#include <stdio.h>
#include <string.h>

void swap(char *x, char *y)
{
    char temp = *x;
    *x = *y;
    *y = temp;
}

void permute(char *str, int l, int r, int *perm_count)
{
    if (l == r)
    {
        printf("%s\n", str);
        (*perm_count)++;
    }
    else
    {
        for (int i = l; i <= r; i++)
        {
            swap((str + l), (str + i));
            permute(str, l + 1, r, perm_count);
            swap((str + l), (str + i)); // backtrack
        }
    }
}

int main(int argc, char const *argv[])
{
    char str[100];
    printf("Enter a string: ");
    scanf("%s", str);
    int n = strlen(str);

    int perm_count = 0;
    int comb_count = 0;

    printf("\nPermutations:\n");
    permute(str, 0, n - 1, &perm_count);
    printf("Total Permutations: %d\n", perm_count);

       return 0;
}
