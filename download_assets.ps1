$baseDir = "d:\Elsawy Pharmacy\ElsawyApp\.stitch_assets"
if (!(Test-Path $baseDir)) { New-Item -ItemType Directory -Path $baseDir }

$screens = @(
    # Register Screen
    @{id="1bc67e1c74f3499f91289fb2d5a74d37"; name="Register"; img="https://lh3.googleusercontent.com/aida/AOfcidWj3lGw_QKNgukksGVNTTU3tXoMRLeg5VpWwQohwEfOM_T3Jy_zG-eMsVuvOFpgdB28UuMkEkvoEfMyqg_Og72g7eZxy-wgxgwT6qIyfhZXjVo5RTTzptkTL_kCNA9ObNwcRhm1j6_D-sh3ql64Jbtlm9iq3djk_UR8w559R0az22jTdy0vcUBCgTDm4QnaY5zEZ5FwClZjP2JDttxfEOnTzMyF2vEhml6BR9FNJatRC0ZN96vPebca65IH"; html="https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzYxZWZiZDczMjY3MTRlYjRiNmQ2MmQ0NDZiYTRlODc1EgsSBxCxwOi5tw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDQzMTA4NjI1NTc2ODM4NjQ2Ng&filename=&opi=89354086"},
    # OTP Verification
    @{id="9bcd5c911b5d423ba8a6c63f79244477"; name="OTP_Verification"; img="https://lh3.googleusercontent.com/aida/AOfcidXGW8FT36KnHfooAhqm-kT_O8MMWLqTH3ZgT8iS6wFdgYOW2ELNDhw1QUHQatVM9qWjHIELzZdr0mUd_gMU3JqWdzGQVKuH4oIqazt45LM8n9UxGyaUQAJT9cp-QijxN_8jazmdAxnW4K4Wxsd8IAS6PvLKcGDQCzxpLVKbALypDK7vSgF7j4qI8HCeLg7xxrTt3hg6nr9UEemyW8fU1D7y_EPHLul_inojGqIvB8BYunWZ4jbnj8NuGP7y"; html="https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2I3MjcwYTA4YmQ2ZDQ5NjE4YzdkODk4YjI2OGJhNDA1EgsSBxCxwOi5tw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDQzMTA4NjI1NTc2ODM4NjQ2Ng&filename=&opi=89354086"},
    # Address Management
    @{id="85036aafc4504bec8ddfadcfd244be7d"; name="Address_Management"; img="https://lh3.googleusercontent.com/aida/AOfcidW_Ct0exFz5RQhrpo_--nN-4B2g4Bl3cp2WMaYRWRDLCoUtK_GXvRMC0LFEDqjQWVz4QJgM0tFf_dGtihj_Y1HV24doq-k0-nErF8YNC9P1eOmVb7ayOBsNawoKQ5deSHGWx1YyH5AZpYlvL-I7h0DP0M4063JdNjC_ZwPwY2d6YdYFO-XFz5uWfH66CO16vUcQICWUVF0i7pBj9Y0SQyE7bGEzL9s3z4Ax1A9ftEquXKEM5emXjLLQzcka"; html="https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2MxMjA1MGU2ZGNkNjRiNTJhNzc5YTdiZGY2ZjMxMjI5EgsSBxCxwOi5tw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDQzMTA4NjI1NTc2ODM4NjQ2Ng&filename=&opi=89354086"},
    # Settings Screen
    @{id="ca6946eab3644e29ae639a43b8166bfd"; name="Settings"; img="https://lh3.googleusercontent.com/aida/AOfcidX4kDoR24bB8B6L2j6_nU2vNxxYUoCdAhv_UL1EZKqxJ5U9kXgxHwn8V19SOuMk4KyY3fC5blY6OwoW3azdKnUdv4iepNI2XYI-897SRgAFYqALJaaGkvsQNIJYNEUYBkqHC0YnRfvSZ0zMu-I1G35pQyplMQE6CBC6sYUQnlDI60xgaZvadrlIFr-S24o9I-Pb95iHzbpa-sSeVHscZIPO3eo65L1EZ0ebU3JVJY0Ef0zaWcgnxlyZJAfn"; html="https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2IxYjE2NWI1YTk5ZDRlODFiYzJmMGU3NTJjMTNjYWMzEgsSBxCxwOi5tw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDQzMTA4NjI1NTc2ODM4NjQ2Ng&filename=&opi=89354086"},
    # Contact Us Screen
    @{id="e49ce34713654f8389948c76b907e0fb"; name="Contact_Us"; img="https://lh3.googleusercontent.com/aida/AOfcidWTPaEXZUljmDg5zV1estrXESVzjXyDHXRiZLhpDszXsGBol_TeZc03rAGceld3GKZohrLpuAAQ-F57cGBp3152sApWgswo-grJR02pnOSev4MFCbeXB-sNWD5bin7050ClANP1iga-ZrsNLIkoxIBDM0VcTaTEk8GOE1tjV2hcs87ES0QsN206zs7bN4LiZYgAxfUSchiBZd-LqFoRU-eTX6gxT6qbxHri8IaHSF2tCFQAxZ2rvLrmdaky"; html="https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2UxZjQ1YmQwMWU5OTQ1ZGY5NTQwM2YxMTExMDE3MDQyEgsSBxCxwOi5tw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDQzMTA4NjI1NTc2ODM4NjQ2Ng&filename=&opi=89354086"},
    # Splash Screen Updated Colors
    @{id="8926ccee98554388bf53966221bb11fb"; name="Splash_Screen_Updated"; img="https://lh3.googleusercontent.com/aida/AOfcidVBMJjmORdvOglJhXUci-z2bR17FhABFWz4XZgZyEXoSW-XqwYxv6ASkYDMUckV2jwYW1o2G6cRhNWOhtYdOg52N_twzrK3mnqEWD2oW5y8uTXR4uMl8ZLgH43Q1btXnaWE3nGdTFlAV6L8mJsgPBAxBAMVkaXFhZVIqOA7ytVjK825lrld4sFG2cyvzcaNrexxkslouGTjLAGLvpvS_1rE4RHv8fC0zH_dFRGWqaQRq4_tuXHZRFpsvZfl"; html="https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2NkMzZkYjE2YWJhMDRlNTE5NDM3YzRmODkwOGM5YWNkEgsSBxCxwOi5tw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDQzMTA4NjI1NTc2ODM4NjQ2Ng&filename=&opi=89354086"},
    # Home Screen Updated Colors
    @{id="5fbc8b98a37a4313ac95e47e58f6354e"; name="Home_Screen_Updated"; img="https://lh3.googleusercontent.com/aida/AOfcidXLKk9MXfBouwlrZinb-MpUxEmPJ_A1v4OOZl_l9w5pbu_9Z9VVwzfuOV68GdbQmYd_00ShXGPnInJ8ZObhg-AntOF2o01AZZZWSpXFpO2GkUPcl_LKdQ4_sAb2ftcOxEoigWPS4gJ3mNndvjuK055eUo6sBRIszUEdFVE9z8Qd8N02PmODAiinOAVXPWtabKZvqIzGScWfpvCR4d2RSjuZlw8Itn0_32-xNHSAcE41joihTTht3Cv_5ZQ"; html="https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2E0ZGYxNDc0MjRjOTRjMjc4NjYzZjI2MzdjNmZiNmY0EgsSBxCxwOi5tw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDQzMTA4NjI1NTc2ODM4NjQ2Ng&filename=&opi=89354086"},
    # Login Screen Updated Colors
    @{id="4004cea4cf244cb1bd8fb6f2356bd6eb"; name="Login_Screen_Updated"; img="https://lh3.googleusercontent.com/aida/AOfcidVR6O5ngodQQSD4udIXLDaoe12rl2IBF8t2ClL7mXTD3G82-KCI4AbDMAPGmmlm4wVxDnk8uDcegLKDug1Au53GHEbmpfn6pUYwrc2xyCHbv5MQXx2OeGNtL1iu0FoBzntq0YWGLLSXC8hDVsIcHAAXVO7hqmy4MZ7Q7m2zAE0VvfmC1zTpTTpCN9OiQDqqLI7Myb-lRlJxCecQENPq-9MMmq4yox18jcj7EUwkWpcMzNqn11MvUB9Maxg"; html="https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2Y2YzQ2MGM2ZWNmZjQ3ZjRiMzc1MGQ2YjY3MTFiNzhhEgsSBxCxwOi5tw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDQzMTA4NjI1NTc2ODM4NjQ2Ng&filename=&opi=89354086"},
    # Register Screen Updated Colors
    @{id="c8516a2c5a1048fd8520dd5b04c2d3ef"; name="Register_Screen_Updated"; img="https://lh3.googleusercontent.com/aida/AOfcidUU6Y-t1SNKFM1hpUtnZ8m3sVFQ2xEiF9osl2fWuggl4ivweOrMRPrxpV_9lLYGvwYCnAgVzEM07tB1ftefVpORIKqn459XwJrga-YjyLlZql2__20dUZUtlcjCSjLmAaSrGP0L6AC98eoDEawpVEQu7hNW9LbRcANxjxBBHACdpAhF3BsZDn7YFOfQDoj1JJ9uBaJ81JRRggCYe6qcOfshDsBYsippDkg_y6Y9uOW0rq9VSdBBBjpfhgnV"; html="https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzM4NGExN2ExMjVhYTQ4ZWY4OWU4M2MwMjgzNTU4ZDlhEgsSBxCxwOi5tw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDQzMTA4NjI1NTc2ODM4NjQ2Ng&filename=&opi=89354086"},
    # Cart Screen Updated Colors
    @{id="ed34a707ac124c81b434055c9e54380a"; name="Cart_Screen_Updated"; img="https://lh3.googleusercontent.com/aida/AOfcidVakD9w9HePmzcZGK2ut0xQQvRrAXab6us9E9G5ArzCrxVaXAf4KNrmR6TZNK6FrR48-YlCpSBrt102RrouQqBy9g5jSr98_mUDOo-Tilefq13yL24AJ5VwJhL5sUYCWn0ktoNmTUHXmxVmxr3yqYxZgTVgvLkYASUWJn_ZmWVlIEBka-GEm5c0wf4nL6OnuE1hC4lnTtsqJ9XAHS07hXxvYPZEyEzOz2jEfxAd-oFX1lDFCVL4ezMjIma8"; html="https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2RkOGU1Njk3NTZmYzQ3NGM5MmIyODZjZTU4MjA4ZmJlEgsSBxCxwOi5tw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxMDQzMTA4NjI1NTc2ODM4NjQ2Ng&filename=&opi=89354086"}
)

foreach ($screen in $screens) {
    $imgFile = "$baseDir\$($screen.name).png"
    $htmlFile = "$baseDir\$($screen.name).html"
    
    Write-Host "Downloading $($screen.name) screenshot..."
    curl.exe -L $screen.img -o $imgFile
    
    if ($screen.html) {
        Write-Host "Downloading $($screen.name) HTML code..."
        curl.exe -L $screen.html -o $htmlFile
    }
}
